var esdese = function(){
    var fns = [].slice.call(arguments);
    var next = function(i){
        i ++;
        return function(){
            var self = next(i);
            extendApi(self);//扩展api
            fns[i].apply(self, arguments);
        }
    }
    next(-1)();
}

function extendApi(self){
    //并行执行的api
    self.group = function(){
        var count = 0, results = [];
        return function(i){
            var current = count ++;
            return function(res){
                count --;
                results[i == undefined ? current : i] = res;
                count == 0 && self.apply(self, results);
            }
        }
    }
}


module.exports = esdese;