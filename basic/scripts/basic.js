var EXPRESSION_REGEX = "[^,]+";

var VARIABLE_REGEX = "[a-z][a-z_0-9]*";

var FUNCTION_REGEX = "[A-Z][A-Za-z_0-9]*";

var Basic = {
};

function _parseParameterList(str) {
    return _.map(str.split(','), $.trim);
}

function _parseExpressionList(str) {
    return _.map(_parseParameterList(str), Parser.parse);
}

function Statement(source, line) {
    this.source = source;
    this.line = line;
}

Statement.prototype.execute = function(context) {
    throw "Unimplemented: " + this.source;
};

Statement.prototype.startsBlock = false;

Statement.prototype.endsBlock = false;

// Blank

function Blank(source, line) {
    Statement.call(this, source, line);
}

Blank.prototype = Object.create(Statement.prototype);

Blank.prototype.constructor = Blank;

Blank.prototype.execute = function() {
}

Blank.prototype.match = "^\\s*$";

Blank.prototype.syntax = "^\\s*$";

// Remark

function Remark(source, line) {
    Statement.call(this, source, line);
    var match = this.source.match(this.syntax);
    this.remark = match[1];
}

Remark.prototype = Object.create(Statement.prototype);

Remark.prototype.constructor = Remark;

Remark.prototype.execute = function() {
    console.log("REMARK", this.remark);
}

Remark.prototype.match = "^REM\\b";

Remark.prototype.syntax = "^REM\\s*(.*)$";

// Let

function Let(source, line) {
    Statement.call(this, source, line);
    var match = this.source.match(this.syntax);
    this.variable = match[1];
    this.value = Parser.parse(match[2]);
}

Let.prototype = Object.create(Statement.prototype);

Let.prototype.constructor = Let;

Let.prototype.execute = function(processor) {
    processor.variables[this.variable] = processor.evaluate(this.value);
}

Let.prototype.match = "^LET\\b";

Let.prototype.syntax = "^LET\\s+(" + VARIABLE_REGEX + ")\\s*=\\s*(" + EXPRESSION_REGEX + ")\\s*$";

// Interrupt

function Interrupt(source, line) {
    Statement.call(this, source, line);
    var match = this.source.match(this.syntax);
    var params = _parseParameterList(match[1]);
    this.code = eval(params.shift());
    this.parameters = _.map(params, Parser.parse);
}

Interrupt.prototype = Object.create(Statement.prototype);

Interrupt.prototype.constructor = Interrupt;

Interrupt.prototype.execute = function(processor) {
    var parameters = _.map(this.parameters, processor.evaluate, processor);
    processor.io.interrupt(this.code, parameters);
}

Interrupt.prototype.match = "^INTERRUPT\\b";

Interrupt.prototype.syntax = "^INTERRUPT\\s+(0x[0-9a-fA-F]{2}(?:,\\s*" + EXPRESSION_REGEX + ")*)\\s*$";

// Subroutine

function Subroutine(source, line) {
    Statement.call(this, source, line);
    var match = this.source.match(this.syntax);
    this.name = match[1];
    this.parameterNames = _parseParameterList(match[2]);
}

Subroutine.prototype = Object.create(Statement.prototype);

Subroutine.prototype.constructor = Subroutine;

Subroutine.prototype.execute = function() {
}

Subroutine.prototype.invoke = function(processor, parameters) {
    if (parameters.length != this.parameterNames.length) {
        throw 'Incorrect parameters: ' + this.source + ' (received: ' + parameters.join(', ') + ')';
    }
    processor.stack.push({
        caller: processor.statements[processor.pc - 1],
        variables: processor.variables
    });
    processor.pc = this.line;
    processor.variables = _.reduce(this.parameterNames, function(map, name, index) {
        map[name] = parameters[index];
        return map;
    }, {});
}

Subroutine.prototype.startsBlock = true;

Subroutine.prototype.match = "^FUNCTION\\b";

Subroutine.prototype.syntax = "^FUNCTION\\s+(" + FUNCTION_REGEX + ")\\b\\s*(" + VARIABLE_REGEX + "(?:\\s*,\\s*" + VARIABLE_REGEX + ")*)?\\s*$";

// End Subroutine

function EndSub(source, line) {
    Statement.call(this, source, line);
}

EndSub.prototype = Object.create(Statement.prototype);

EndSub.prototype.constructor = EndSub;

EndSub.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    processor.pc = stack.caller.line; // implicit + 1
    processor.variables = stack.variables;
}

EndSub.prototype.endsBlock = true;

EndSub.prototype.match = "^END FUNCTION\\b";

EndSub.prototype.syntax = "^END FUNCTION\\s*$";

// For

function For(source, line) {
    Statement.call(this, source, line);
    var match = source.match(this.syntax);
    this.variable = match[1];
    this.start = Parser.parse(match[2]);
    this.stop = Parser.parse(match[3]);
}

For.prototype = Object.create(Statement.prototype);

For.prototype.constructor = For;

For.prototype.execute = function(processor) {
    var start = processor.evaluate(this.start);
    var stop = processor.evaluate(this.stop);
    processor.variables[this.variable] = start;
    processor.stack.push({ statement: this, stop: stop });
}

For.prototype.startsBlock = true;

For.prototype.match = "^FOR\\b";

For.prototype.syntax = "^FOR\\s+(" + VARIABLE_REGEX + ")\\s+=\\s+(" + EXPRESSION_REGEX + ")\\s+TO\\s+(" + EXPRESSION_REGEX + ")\\s*$";

// Next

function Next(source, line) {
    Statement.call(this, source, line);
    var match = source.match(this.syntax);
    this.variable = match[1];
}

Next.prototype = Object.create(Statement.prototype);

Next.prototype.constructor = Next;

Next.prototype.execute = function(processor) {
    var entry = processor.stack.pop();
    if (!(entry.statement instanceof For)) {
        throw("Error: Unexpected " + this.source);
    } else if (entry.statement.variable != this.variable) {
        throw("Error: Mismatched " + this.source);
    }
    var value = 1 + processor.variables[this.variable];
    if (value <= entry.stop) {
        processor.variables[this.variable] = value;
        processor.stack.push(entry);
        processor.pc = entry.statement.line; // 1 offset so +1
    }
}

Next.prototype.endsBlock = true;

Next.prototype.match = "^NEXT\\b";

Next.prototype.syntax = "^NEXT\\s+(" + VARIABLE_REGEX + ")\\s*$";

// Loop

function Loop(source, line) {
    Statement.call(this, source, line);
}

Loop.prototype = Object.create(Statement.prototype);

Loop.prototype.constructor = Loop;

Loop.prototype.execute = function(processor) {
    processor.stack.push({ statement: this });
}

Loop.prototype.startsBlock = true;

Loop.prototype.match = "^LOOP\\b";

Loop.prototype.syntax = "^LOOP\\s*$";

// Until

function Until(source, line) {
    Statement.call(this, source, line);
    var match = source.match(this.syntax);
    this.expression = Parser.parse(match[1]);
}

Until.prototype = Object.create(Statement.prototype);

Until.prototype.constructor = Until;

Until.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    if (!(stack.statement instanceof Loop)) {
        throw("Error: Unexpected " + this.source);
    }
    var value = processor.evaluate(this.expression);
    if (!value) {
        processor.stack.push(stack);
        processor.pc = stack.statement.line; // 1 offset so +1
    }
}

Until.prototype.endsBlock = true;

Until.prototype.match = "^UNTIL\\b";

Until.prototype.syntax = "^UNTIL\\s+(" + EXPRESSION_REGEX + ")\\s*$";

// While

function While(source, line) {
    Statement.call(this, source, line);
    var match = source.match(this.syntax);
    this.expression = Parser.parse(match[1]);
}

While.prototype = Object.create(Statement.prototype);

While.prototype.constructor = While;

While.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    if (!(stack.statement instanceof Loop)) {
        throw("Error: Unexpected " + this.source);
    }
    var value = processor.evaluate(this.expression);
    if (value) {
        processor.stack.push(stack);
        processor.pc = stack.statement.line; // 1 offset so +1
    }
}

While.prototype.endsBlock = true;

While.prototype.match = "^WHILE\\b";

While.prototype.syntax = "^WHILE\\s+(" + EXPRESSION_REGEX + ")\\s*$";

// Call

function Call(source, line) {
    Statement.call(this, source, line);
    var match = source.match(this.syntax);
    this.subroutine = match[1];
    this.parameters = _parseExpressionList(match[2]);
}

Call.prototype = Object.create(Statement.prototype);

Call.prototype.constructor = Call;

Call.prototype.execute = function(processor) {
    var subroutine = processor.subroutines[this.subroutine];
    if (!subroutine) {
        throw "Unknown subroutine: " + this.source;
    }
    var parameters = _.map(this.parameters, processor.evaluate, processor);
    subroutine.invoke(processor, parameters);
}

Call.prototype.startsBlock = true;

Call.prototype.match = "^" + FUNCTION_REGEX + "\\b";

Call.prototype.syntax = "^(" + FUNCTION_REGEX + ")\\s*(" + EXPRESSION_REGEX + "(,\\s*" + EXPRESSION_REGEX + ")*)?\\s*$";

// Basic

Basic.statements = [
    Blank,
    Remark,
    Let,
    Interrupt,
    For,
    Next,
    Loop,
    While,
    Until,
    Subroutine,
    EndSub,
    Call // MUST BE LAST
];

Basic.parseStatement = function(source, line) {
    source = $.trim(source);
    var statement = _.find(Basic.statements, function(s) {
        return new RegExp(s.prototype.match).test(source);
    });
    if (!statement) {
        throw "Unknown statement: " + source;
    }
    if (!(new RegExp(statement.prototype.syntax).test(source))) {
        throw "Syntax error: " + source;
    }
    return new statement(source, line);
};

