// Processor

function Processor(statements) {
    this.statements = statements;
    this.variables = {};
    this.pc = 0;
    this.stack = [{}];
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

