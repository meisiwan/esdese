# step
javascript final callback hell solution(最终的js回调地狱解决方案)

```
var Step = function(){
    var fns = [].slice.call(arguments);
    var next = function(i){
        i ++;
        return function(){
            var self = next(i);
            var result = fns[i].apply(self, arguments);
            result && self.call(self, result);//同步返回 则传给下一个函数 Sync return is passed to the next function
        }
    }
    next(-1)();
}
```

Just 12 lines of code (仅仅12行代码)

example: 
```
Step(
    function(){
        console.log('one request');
        setTimeout(this, 2000);
    },
    function(){
        console.log('two request');
        setTimeout(this, 2000);
    },
    function(){
        console.log('three request');
        setTimeout(this, 2000);
    },
    function(){
        console.log('success')
    }
)
```

Other usage: 

```
var list = [{
    list: ['1', '2', '3'],
},{
    list: ['4', '5', '6'],

}]
Step(
    function(){
        list.forEach(this);
    },
    function(item){
        return item.list.reduce((a, b) => a + b, '');
    },
    function(sum){
        console.log('sum:', sum);
        //sum: 123
        //sum: 456
    }
);

```

If it's easy to use, add stars.(加点星呗)
