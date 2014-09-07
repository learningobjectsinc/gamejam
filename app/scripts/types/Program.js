'use strict';

angular.module('gamejamApp').factory('Program', function($timeout, $rootScope, RobotIO, libraryFunctions){
	var program = function(code){
        var librarySourceLines = [];
        for (var functionName in libraryFunctions) {
            var lines = libraryFunctions[functionName]['source'];
            for (var i = 0;i < lines.length;i++) {
                librarySourceLines.push(lines[i]);
            }
        }
        this.library = Basic.parseProgram(librarySourceLines);
		this.code = code || '';
		this.statements = null;
		this.processor = null;
		this.io = null;
		this.sleeper = null;
		this.paused = false;
	};

    program.prototype.init = function(src) {
	src = src || [];
	this.statements = Basic.parseProgram(src);
        this.statements.addLibrary(this.library);
        console.log(this.statements);

	    this.io = RobotIO;
	    this.paused = false;
	    this.sleeper = null;
	    this.processor = new Processor(this.statements, this.io, $rootScope);
this.library.processor = this.processor; // TODO: KILLME: HACK
	};

	program.prototype.compile = function(){
	    program.prototype.init.call(this, this.code.split('\n'));
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

	program.prototype.variables = function(){
            if(!this.processor){
                return;
            }
            return _.reduce(this.processor.variables, function(str, value, variable) {
                return str + '<div>' + variable + ' = ' + value + '</div>';
            }, '');
        };

	return program;
});
