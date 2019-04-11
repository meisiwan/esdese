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
            count ++;
            return function(res){
                count --;
                results[i == undefined ? count : i] = res;
                count == 0 && self.apply(self, typeof i == 'number' ? results : results.reverse());
            }
        }
    }
}

Array.prototype.reverse = Array.prototype.reverse || function(){
    var result = [], len = this.length;
    for(var i = 0; i < len; i++) {
        result[result.length] = this[len - i - 1];
    }
    return result;
}

module.exports = esdese;