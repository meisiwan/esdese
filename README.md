# step
Final callback solution(最终的异步回调解决方案)

```
var Step = function(){
    var fns = [].slice.call(arguments);
    var next = function(i){
        i ++;
        return function(){
            var self = next(i);
            var result = fns[i].apply(self, arguments);
            result && self.call(self, result);//同步返回 则传给下一个函数
        }
    }
    next(-1)();
}
```

