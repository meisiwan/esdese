var Step = function(){
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
        return function(){
            count ++;
            return function(res){
                count --;
                results[count] = res;
                if(count == 0){
                    self.apply(self, results.reverse());
                }
            }
        }
    }
}

module.exports = Step;