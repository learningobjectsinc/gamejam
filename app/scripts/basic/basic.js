var EXPRESSION_REGEX = "(?:'[^']*'|[^',])+";

var VARIABLE_REGEX = "[a-z][a-z_0-9]*";

var FUNCTION_REGEX = "[A-Z][A-Za-z_0-9]*";

var Basic = {
};

function _parseParameterList(str) {
    return _.map(str.split(','), $.trim);
}

function _parseExpressionList(str) {
    var re = new RegExp(EXPRESSION_REGEX, 'g');
    var result = [], match;
    while (match = re.exec(str)) {
        result.push(Parser.parse($.trim(match[0])));
    }
    return result;
}

function Statement() {
}

Statement.prototype.init = function(source, line) {
    this.source = source;
    this.line = line;
    var match = source.match(this.syntax);
    this.invalid = !match;
    if (!this.invalid) {
        try {
            this.initmatch(match);
        } catch (e) {
            console.log('Init error', source, e);
        }
    }
}

Statement.prototype.initmatch = function(match) {
};

Statement.prototype.execute = function(context) {
    throw "Unimplemented: " + this.source;
};

Statement.prototype.skipBlock = function(processor) {
    var depth = 1, statement;
    while (depth && (processor.pc < processor.statements.length)) {
        statement = processor.statements[processor.pc];
        ++ processor.pc;
        if (statement.startsBlock) {
            ++ depth;
        } else if (statement.endsBlock) {
            -- depth;
        }
    }
    if (depth) {
        throw "Unexpected end of file: " + this.source;
    }
    return statement;
};

Statement.prototype.startsBlock = false;

Statement.prototype.endsBlock = false;

// BlankStatement

function BlankStatement() {
}

BlankStatement.prototype = Object.create(Statement.prototype);

BlankStatement.prototype.constructor = BlankStatement;

BlankStatement.prototype.execute = function() {
}

BlankStatement.prototype.match = "^\\s*$";

BlankStatement.prototype.syntax = "^\\s*$";

// RemarkStatement

function RemarkStatement() {
}

RemarkStatement.prototype = Object.create(Statement.prototype);

RemarkStatement.prototype.constructor = RemarkStatement;

RemarkStatement.prototype.initmatch = function(match) {
    this.remark = match[1];
}

RemarkStatement.prototype.execute = function() {
    console.log("REMARK", this.remark);
}

RemarkStatement.prototype.match = "^REM\\b";

RemarkStatement.prototype.syntax = "^REM\\s*(.*)$";

// LetStatement

function LetStatement() {
}

LetStatement.prototype = Object.create(Statement.prototype);

LetStatement.prototype.constructor = LetStatement;

LetStatement.prototype.initmatch = function(match) {
    this.variable = match[1];
    this.value = Parser.parse(match[2]);
}

LetStatement.prototype.execute = function(processor) {
    processor.variables[this.variable] = processor.evaluate(this.value);
}

LetStatement.prototype.match = "^LET\\b";

LetStatement.prototype.syntax = "^LET\\s+(" + VARIABLE_REGEX + ")\\s*=\\s*(" + EXPRESSION_REGEX + ")\\s*$";

// InterruptStatement

function InterruptStatement() {
}

InterruptStatement.prototype = Object.create(Statement.prototype);

InterruptStatement.prototype.constructor = InterruptStatement;

InterruptStatement.prototype.initmatch = function(match) {
    this.parameters = _parseExpressionList(match[1]);
}

InterruptStatement.prototype.execute = function(processor) {
    var parameters = _.map(this.parameters, processor.evaluate, processor);
    var code = parameters.shift();
    processor.io.interrupt(code, parameters);
}

InterruptStatement.prototype.match = "^INTERRUPT\\b";

InterruptStatement.prototype.syntax = "^INTERRUPT\\s+(" + EXPRESSION_REGEX + "(?:,\\s*" + EXPRESSION_REGEX + ")*)\\s*$";

// FunctionStatement

function FunctionStatement() {
}

FunctionStatement.prototype = Object.create(Statement.prototype);

FunctionStatement.prototype.constructor = FunctionStatement;

FunctionStatement.prototype.initmatch = function(match) {
    this.name = match[1];
    this.parameterNames = _parseParameterList(match[2]);
}

FunctionStatement.prototype.execute = function(processor) {
    var statement = this.skipBlock(processor);
    if (!(statement instanceof EndFunctionStatement)) {
        throw "Unexpected: " + statement.sourc;
    }
}

FunctionStatement.prototype.invoke = function(processor, parameters) {
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

FunctionStatement.prototype.startsBlock = true;

FunctionStatement.prototype.match = "^FUNCTION\\b";

FunctionStatement.prototype.syntax = "^FUNCTION\\s+(" + FUNCTION_REGEX + ")\\b\\s*(" + VARIABLE_REGEX + "(?:\\s*,\\s*" + VARIABLE_REGEX + ")*)?\\s*$";

// End FunctionStatement

function EndFunctionStatement() {
}

EndFunctionStatement.prototype = Object.create(Statement.prototype);

EndFunctionStatement.prototype.constructor = EndFunctionStatement;

EndFunctionStatement.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    processor.pc = stack.caller.line; // implicit + 1
    processor.variables = stack.variables;
}

EndFunctionStatement.prototype.endsBlock = true;

EndFunctionStatement.prototype.match = "^END FUNCTION\\b";

EndFunctionStatement.prototype.syntax = "^END FUNCTION\\s*$";

// ForStatement

function ForStatement() {
}

ForStatement.prototype = Object.create(Statement.prototype);

ForStatement.prototype.constructor = ForStatement;

ForStatement.prototype.initmatch = function(match) {
    this.variable = match[1];
    this.start = Parser.parse(match[2]);
    this.stop = Parser.parse(match[3]);
}

ForStatement.prototype.execute = function(processor) {
    var start = processor.evaluate(this.start);
    var stop = processor.evaluate(this.stop);
    processor.variables[this.variable] = start;
    processor.stack.push({ statement: this, stop: stop });
}

ForStatement.prototype.startsBlock = true;

ForStatement.prototype.match = "^FOR\\b";

ForStatement.prototype.syntax = "^FOR\\s+(" + VARIABLE_REGEX + ")\\s+=\\s+(" + EXPRESSION_REGEX + ")\\s+TO\\s+(" + EXPRESSION_REGEX + ")\\s*$";

// NextStatement

function NextStatement() {
}

NextStatement.prototype = Object.create(Statement.prototype);

NextStatement.prototype.constructor = NextStatement;

NextStatement.prototype.initmatch = function(match) {
    this.variable = match[1];
}

NextStatement.prototype.execute = function(processor) {
    var entry = processor.stack.pop();
    if (!(entry.statement instanceof ForStatement)) {
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

NextStatement.prototype.endsBlock = true;

NextStatement.prototype.match = "^NEXT\\b";

NextStatement.prototype.syntax = "^NEXT\\s+(" + VARIABLE_REGEX + ")\\s*$";

// IfStatement

function IfStatement() {
}

IfStatement.prototype = Object.create(Statement.prototype);

IfStatement.prototype.constructor = IfStatement;

IfStatement.prototype.initmatch = function(match) {
    this.expression = Parser.parse(match[1]);
}

IfStatement.prototype.execute = function(processor) {
    var expression = processor.evaluate(this.expression);
    if (!expression) {
        var statement = this.skipBlock(processor);
        if (!(statement instanceof EndIfStatement)) {
            throw "Unexpected: " + statement.sourc;
        }
    }
}

IfStatement.prototype.startsBlock = true;

IfStatement.prototype.match = "^IF\\b";

IfStatement.prototype.syntax = "^IF\\s+(" + EXPRESSION_REGEX + ")\\s+THEN\\s*$";

// EndIfStatement

function EndIfStatement() {
}

EndIfStatement.prototype = Object.create(Statement.prototype);

EndIfStatement.prototype.constructor = EndIfStatement;

EndIfStatement.prototype.execute = function(processor) {
}

EndIfStatement.prototype.endsBlock = true;

EndIfStatement.prototype.match = "^END\\s+IF\\b";

EndIfStatement.prototype.syntax = "^END\\s+IF\\s*$";

// LoopStatement

function LoopStatement() {
}

LoopStatement.prototype = Object.create(Statement.prototype);

LoopStatement.prototype.constructor = LoopStatement;

LoopStatement.prototype.execute = function(processor) {
    processor.stack.push({ statement: this });
}

LoopStatement.prototype.startsBlock = true;

LoopStatement.prototype.match = "^LOOP\\b";

LoopStatement.prototype.syntax = "^LOOP\\s*$";

// UntilStatement

function UntilStatement() {
}

UntilStatement.prototype = Object.create(Statement.prototype);

UntilStatement.prototype.constructor = UntilStatement;

UntilStatement.prototype.initmatch = function(match) {
    this.expression = Parser.parse(match[1]);
}

UntilStatement.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    if (!(stack.statement instanceof LoopStatement)) {
        throw("Error: Unexpected " + this.source);
    }
    var value = processor.evaluate(this.expression);
    if (!value) {
        processor.stack.push(stack);
        processor.pc = stack.statement.line; // 1 offset so +1
    }
}

UntilStatement.prototype.endsBlock = true;

UntilStatement.prototype.match = "^UNTIL\\b";

UntilStatement.prototype.syntax = "^UNTIL\\s+(" + EXPRESSION_REGEX + ")\\s*$";

// WhileStatement

function WhileStatement() {
}

WhileStatement.prototype = Object.create(Statement.prototype);

WhileStatement.prototype.constructor = WhileStatement;

WhileStatement.prototype.initmatch = function(match) {
    this.expression = Parser.parse(match[1]);
}

WhileStatement.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    if (!(stack.statement instanceof LoopStatement)) {
        throw("Error: Unexpected " + this.source);
    }
    var value = processor.evaluate(this.expression);
    if (value) {
        processor.stack.push(stack);
        processor.pc = stack.statement.line; // 1 offset so +1
    }
}

WhileStatement.prototype.endsBlock = true;

WhileStatement.prototype.match = "^WHILE\\b";

WhileStatement.prototype.syntax = "^WHILE\\s+(" + EXPRESSION_REGEX + ")\\s*$";

// FunctionCall

function FunctionCall() {
}

FunctionCall.prototype = Object.create(Statement.prototype);

FunctionCall.prototype.constructor = FunctionCall;

FunctionCall.prototype.initmatch = function(match) {
    this.subroutine = match[1];
    this.parameters = _parseExpressionList(match[2]);
}

FunctionCall.prototype.execute = function(processor) {
    var subroutine = processor.subroutines[this.subroutine];
    if (!subroutine) {
        throw "Unknown subroutine: " + this.source;
    }
    var parameters = _.map(this.parameters, processor.evaluate, processor);
    subroutine.invoke(processor, parameters);
}

FunctionCall.prototype.match = "^" + FUNCTION_REGEX + "\\b";

FunctionCall.prototype.syntax = "^(" + FUNCTION_REGEX + ")\\s*(" + EXPRESSION_REGEX + "(,\\s*" + EXPRESSION_REGEX + ")*)?\\s*$";

// Basic

Basic.statements = [
    BlankStatement,
    RemarkStatement,
    LetStatement,
    InterruptStatement,
    IfStatement,
    EndIfStatement,
    ForStatement,
    NextStatement,
    LoopStatement,
    WhileStatement,
    UntilStatement,
    FunctionStatement,
    EndFunctionStatement,
    FunctionCall // MUST BE LAST
];

Basic.parseStatement = function(source, line) {
    source = $.trim(source);
    var statement = _.find(Basic.statements, function(s) {
        return new RegExp(s.prototype.match).test(source);
    });
    if (!statement) {
        throw "Unknown statement: " + source;
    }
    var stmt = new statement();
    stmt.init(source, line);
    return stmt;
};

