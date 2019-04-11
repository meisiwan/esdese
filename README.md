# esdese
javascript 异步流程控制 (Asynchronous process control)

example: 

``` js
esdese(
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

``` js
var list = [{
    list: ['1', '2', '3'],
},{
    list: ['4', '5', '6'],

}]
esdese(
    function(){
        list.forEach(this);
    },
    function(item){
        this(item.list.reduce((a, b) => a + b, ''));
    },
    function(sum){
        console.log('sum:', sum);
        //sum: 123
        //sum: 456
    }
);

```


parallel  并行

``` js
esdese(
    function(){
        var group = this.group();
        // setTimeout(group().bind(this, 'a'), 2000);
        // setTimeout(group().bind(this, 'b'), 2000);
        for(var i = 0; i < 3; i ++){
            let temp = group();
            setTimeout(function(){
                temp(Date.now() / 1000);
            }, 1000 * i);
        }
    },
    function(a, b, c){
        console.log(a, b, c);
        //1554949386.242 1554949387.235 1554949388.235
    }
)
```


# Support
## >= ie6
