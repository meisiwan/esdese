var assert = require('assert');
var Step = require('./esdese');
describe('异步流程', function() {
  describe('Step', function() {
    this.timeout(60000);
    it('如果并行执行成功', function(done) {
        esdese(
            function(){
                var group = this.group();
                // setTimeout(group().bind(this, 'a'), 2000);
                // setTimeout(group().bind(this, 'b'), 2000);
                for(var i = 1; i < 4; i ++){
                    let temp = group();
                    setTimeout(function(){
                        temp(Date.now() / 1000);
                    }, 1000 * i);
                }
            },
            function(a, b, c){
                done();
                console.log(a, b, c);
                //1554949386.242 1554949387.235 1554949388.235  
            }
        )
    });
  });
});