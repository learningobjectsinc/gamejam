// Processor

function Processor(statements, io) {
    this.statements = statements;
    this.io = io;
    this.variables = {};
    this.pc = 0;
    this.stack = [{}];
    this.subroutines = _.indexBy(_.filter(statements, function(statement) {
            return statement instanceof Subroutine;
        }), 'name');
}

Processor.prototype.halted = function() {
    return this.pc >= this.statements.length;
}

Processor.prototype.step = function() {
    var statement = this.statements[this.pc];
    ++ this.pc;
    statement.execute(this);
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
    console.log('Interrupt!', code, parameters);
}
