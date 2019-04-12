var assert = require('assert');
var esdese = require('./esdese');
describe('异步流程', function() {
  describe('esdese', function() {
    this.timeout(60000);
    it('如果并行执行成功', function(done) {
        esdese(
            function(){
                var group = this.group();
                // setTimeout(group('a'), 2000);
                // setTimeout(group('b'), 2000);
                for(var i = 0; i < 3; i ++){
                    setTimeout(group(/*time*/).param(Date.now() / 1000), 1000 * i);
                }
                // ['a', 'b', 'c'].forEach(this.wait);
                // this.start();
            },
            function(a, b, c){
                console.log(a, b, c)
                done();
                //1554949386.242 1554949387.235 1554949388.235  
            },
            
            
        )
    });
  });
});