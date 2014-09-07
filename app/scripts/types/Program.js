'use strict';

angular.module('gamejamApp').factory('Program', function($timeout, $rootScope, RobotIO){
	var program = function(code){
		this.code = code || '';
		this.statements = [];
		this.processor = null;
		this.io = null;
		this.sleeper = null;
		this.paused = false;
	};

	//TODO: Get rid of this...
	program.prototype.init = function() {
	    this.statements = Basic.parseProgram([]);

            console.log(this.statements);

	    this.io = RobotIO;
	    this.processor = new Processor(this.statements, this.io, $rootScope);
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
	    this.processor.step();
        };

	program.prototype.run = function(){
	    if (this.processor.halted) {
	        return;
	    }
        this.step();
		this.paused = false;
        this.sleeper = $timeout(_.bind(this.run, this), 25);
	};

	program.prototype.kill = function(){
		if(this.isRunning()){
			$timeout.cancel(this.sleeper);
			this.paused = false;
			this.sleeper = null;
			this.compile(); // TODO: just reset function pointer to start, don't recompile
		}
	};

	program.prototype.pause = function(){
		this.paused = true;
		$timeout.cancel(this.sleeper);
	};

	program.prototype.resume = function(){
		this.run();
	};

	program.prototype.isPaused = function(){
		return this.isRunning() && !!this.paused;
	};

	program.prototype.isRunning = function(){
		return !!this.sleeper && !this.processor.halted;
	};

	return program;
});
