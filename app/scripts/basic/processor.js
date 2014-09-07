// Processor

function Processor(program, io, angularScope) {
    this.program = program;

program.processor = this; // TODO: Kill me: This is far ASK..

    this.pc = 0;
    this.io = io;
    this.angularScope = angularScope;
    this.nextStatement = null;
    this.variables = {};
    this.halted = false;
    this.crashed = null;
    this.stack = [];
}

Processor.prototype.step = function() {
    this.statement = this.nextStatement || this.program.children[0];
    this.nextStatement = null;
    var statement = this.statement;
    try {
        if (!statement) {
            this.halted = true; // done
        } else {
            if (statement.isInvalid()) {
                throw "Invalid statement: " + statement.source;
            }
            statement.execute(this);
            if (!this.nextStatement) {
                this.nextStatement = this.statement.nextStatement(true);
            }
            // TODO: Killme when i can give line number as statement id
            this.pc = 0;
            var context = this.program.children[0];
            while (context && (context != this.nextStatement)) {
                ++ this.pc;
                context = context.nextStatement(true);
            }
        }

        this.angularScope.$broadcast('processor.step');
    } catch (e) {
        this.halted = true;
        this.crashed = e;
    }
}

Processor.prototype.log = function() {
    console.log('Statement', this.statement.source);
    console.log('Variables', this.variables);
}

Processor.prototype.evaluate = function(expr) {
    return expr.evaluate(this.variables);
}

// IO

function IO() {
}

IO.prototype.interrupt = function(code, parameters) {
    throw "Unimplemented";
}


// BasicIO

function BasicIO() {
    IO.call(this);
    this.console = [];
}

BasicIO.prototype = Object.create(IO.prototype);

BasicIO.prototype.constructor = BasicIO;

BasicIO.prototype.interrupt = function(code, parameters) {
    if (code == 'print') {
        this.console = this.console.concat(parameters);
    } else {
        throw "Unknown Interrupt: " + code;
    }
}
