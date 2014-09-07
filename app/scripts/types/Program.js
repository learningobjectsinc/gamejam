'use strict';

angular.module('gamejamApp').factory('Program', function($timeout, $rootScope, RobotIO){
	var program = function(code){
    
        this.library = Basic.parseProgram([
            "// Turn the robot right", 
            "FUNCTION TurnRight()",
            "  TELL robot : Turn('right')", 
            "  Wait()",
            "END FUNCTION",

            "// Turn the robot left", 
            "FUNCTION TurnLeft()",
            "  TELL robot : Turn('left')", 
            "  Wait()",
            "END FUNCTION",

            "// Move the robot forward one block;", 
            "FUNCTION Step()",
            "  TELL robot : MoveForward(1)", 
            "  Wait()",
            "END FUNCTION",

            "// Wait for the robot to finish",
            "FUNCTION Wait()",
            "  WHILE ASK('Busy')",
            "    // Just wait",
            "  END WHILE", 
            "END FUNCTION"
        ]);
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
