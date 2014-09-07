'use strict';

angular.module('gamejamApp').factory('Program', function($timeout, $rootScope, RobotIO){
	var program = function(code){
		this.code = code || '';
		this.statements = [];
		this.processor = null;
		this.io = null;
	};

	program.prototype.compile = function(){
	    var source = this.code.split('\n');

	    this.statements = Basic.parseProgram(source);

	    console.log(this.statements);

	    this.io = RobotIO;
	    this.processor = new Processor(this.statements, this.io, $rootScope);
	};

	program.prototype.step = function(){
        if (this.processor.halted) {
            return;
        }
        if(this.io.isBusy()){
            setTimeout(_.bind(this.step, this), 100);
        } else {
	       this.processor.step();
        }
    };

	program.prototype.run = function(){
	    if (this.processor.halted) {
	        return;
	    }
        if(this.io.isBusy()){
            setTimeout(_.bind(this.run, this), 100);
        } else {
            this.step();
            this.run();
        }
	};

	return program;
});
