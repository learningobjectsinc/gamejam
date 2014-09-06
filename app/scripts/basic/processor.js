// Processor

function Processor(statements, io) {
    this.statements = statements;
    this.io = io;
    this.variables = {};
    this.pc = 0;
    this.halted = false;
    this.stack = [{}];
    this.functions = _.indexBy(_.filter(statements, function(statement) {
            return statement instanceof FunctionStatement;
        }), 'name');
}

Processor.prototype.step = function() {
    var statement = this.statements[this.pc];
    ++ this.pc; // I have to preincrement this because the statement may change the PC
    try {
        var invalid = (typeof statement.invalid == 'function') ? statement.invalid(this) : statement.invalid;
        if (invalid) {
            throw "Invalid statement: " + statement.source;
        }
        statement.execute(this);
        this.halted = this.pc >= this.statements.length;
    } catch (e) {
        this.halted = true;
        -- this.pc;
        throw e;
    }
}

Processor.prototype.log = function() {
    console.log('Line', this.pc, this.statements[this.pc]);
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
}

BasicIO.prototype = Object.create(IO.prototype);

BasicIO.prototype.constructor = BasicIO;

BasicIO.prototype.interrupt = function(code, parameters) {
    if (code == 'print') {
        $('.console').append('<div>' + parameters.join(', ') + '</div>');
    } else {
        throw "Unknown Interrupt: " + code;
    }
}
