angular.module('gamejamApp').factory('Program', function($timeout){
	var program = function(code){
		this.code = code || '',
		this.statements = [],
		this.processor = null
	};

	program.prototype.compile = function(){
	    var source = this.code.split('\n');

	    this.statements = _.map(source, function(s, i) {
	        return Basic.parseStatement(s, 1 + i);
	    });

	    console.log(this.statements);

	    var io = new BasicIO();
	    this.processor = new Processor(this.statements, io);

	    $('.pc').val('>');
	    $('.console').text('');
	};

	program.prototype.step = function(){
	    if (this.processor.halted) {
	        return;
	    }
	    this.processor.step();
	};

	program.prototype.run = function(){
	    if (this.processor.halted) {
	        return;
	    }
	    this.step();
	    $timeout(_.bind(this.run, this), 250);
	};

	return program;
});