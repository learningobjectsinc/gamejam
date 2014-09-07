// Processor

function Processor(program, io) {
    this.program = program;
    this.pc = 0;
    this.io = io;
    this.nextStatement = program.firstChild;
    this.variables = {};
    this.halted = false;
    this.stack = [];
    this.functions = {};
    for (var child = program.firstChild; child; child = child.nextSibling) {
        if (child instanceof FunctionStatement) {
            this.functions[child.name] = child;
        }
    }
}

Processor.prototype.step = function() {
    this.statement = this.nextStatement;
    this.nextStatement = null;
    var statement = this.statement;
    try {
        if (!statement) {
            this.halted = true; // done
        } else {
            var invalid = (typeof statement.invalid == 'function')
                ? statement.invalid(this) : statement.invalid;
            if (invalid) {
                throw "Invalid statement: " + statement.source;
            }
            statement.execute(this);
            if (!this.nextStatement) {
                this.nextStatement = this.statement.nextStatement(true);
            }
            // TODO: Killme
            this.pc = 1;
            var context = this.program.firstChild;
            while (context && (context != this.nextStatement)) {
                ++ this.pc;
                context = context.nextStatement(true);
            }
        }
    } catch (e) {
        this.halted = true;
        throw e;
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
