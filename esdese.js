var esdese = function(){
    var fns = toArr(arguments), data = { list: [], map: {} }, _data = { waitCount: 0, list: [] };
    var next = function(i){
        i ++;
        return function(){
            var self = next(i);
            extendApi(self, data, _data);//扩展api
            fns[i].apply(self, arguments);
        }
    }
    next(-1)();
}
//扩展API
function extendApi(self, data, _data){
    // 内部存储空间
    self.data = data; 
    self.reset = function(){
        self.data.list = [];
        self.data.map = {};
    }
    //并行执行的api
    self.group = function(){
        var count = 0, results;
        return function(g){//g分组
            var current = count ++, _this;
            results = g ? results || {} : [] ;//如果有分组参数  则为对象
            g && (results[g] = []); //初始化
            _this = function(res){
                count --;
                if(g){//是否有分组参数
                    results[g] = results[g] instanceof Array ? results[g] : [results[g]];
                    results[g] = results[g].concat(toArr(arguments));
                    results[g] = results[g].length <= 1 ? results[g][0] : results[g];
                }else{
                    results[current] = arguments.length == 1 ? res : toArr(arguments)
                }
                count == 0 && (g ? self.call(self, results) : self.apply(self, results));
            }
            _this.param = self.param.bind(_this);
            return _this;
        }
    }
    //事先传递参数
    self.param = function(){
        var args = toArr(arguments), self = this;
        return function(){
            self.apply(self, args.concat(toArr(arguments)));
        }
    }
    //循环等待
    self.wait = function(){
        _data.waitCount ++;
        _data.list.push(toArr(arguments));
    }
    self.start = function(){
        for(var i = 0; i < _data.list.length; i ++){
            self.apply(self, _data.list[i]);
        }
    }
    self.end = function(){
        _data.waitCount > 0 &&_data.waitCount --;
        if(_data.waitCount == 0){
            _data.list = [];
            self.apply(self, toArr(arguments));
        }
    }
}



//辅助函数
function toArr(list){
    return [].slice.call(list);
}
Array.prototype.concat = Array.prototype.concat || function(list){
    var arr = [];
    for(var i = 0; i < this.length; i ++){
        arr[i] = this[i];
    }
    for(var i = 0; i < list.length; i ++){
        arr[arr.length] = list[i];
    }
    return arr;
}

module.exports = esdese;