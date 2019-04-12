# esdese
javascript (goodbye callback and promise) 回调流程控制 跟回调、promise 说再见

## use 
``` shell 
npm i esdese
```
support node.js

# example: 

## flow 串行

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
        //可以通过param先传递一个参数过去
        setTimeout(this.param('test'), 2000);
    },
    function(a){
        console.log(a)
        // test
    }
)
//console
// one request    time: 0
// two request    time: 2000
// three request  time: 4000
// test           time: 6000
```

## loop 循环

``` js

esdese(
    function(){
        ['a', 'b', 'c'].forEach(this);
    },
    function(item){
        console.log(item); 
        //内部默认的数组和对象  其他需自己定义
        // this.data.list.push(a);   default Array => list
        // this.data.map.item.a = item;   default Object => map
        // this.reset();  reset list => [] and map => {}   重置默认的数组和对象
        this('success');
    },
    function(result){
        console.log(result);
    }
);
//console
// a
// success
// b
// success
// c
// success

```


### need wait
``` js

esdese(
    function(){
        ['a', 'b', 'c'].forEach(this.wait);
        this.start();
    },
    function(item){
        console.log(item); 
        this.end('success')
    },
    function(result){
        console.log(result)
    }
);
//console
// a
// b
// c
// success

```

## parallel 分组并行

``` js
esdese(
    function(){
        var group = this.group();
        //1: group has name
        // setTimeout(group('a'), 2000);
        // setTimeout(group('b'), 2000);

        for(var i = 0; i < 3; i ++){
            //2: group no name 
            //3: group has name
            setTimeout(group(/*'time'*/).param(i), 1000 * i);
        }
    },
    function(a, b, c){
        console.log(a, b, c);
        //1:    { a: undefined, b: undefined } undefined undefined
        //2:    0 1 2
        //3:    { time: [ 0, 1, 2 ] }  undefined  undefined
    }
)
```


# Support
## >= ie6
