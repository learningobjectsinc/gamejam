var EXPRESSION_REGEX = "(?:'[^']*'|[^',])+";

var VARIABLE_REGEX = "[a-z][a-z_0-9]*";

var FUNCTION_REGEX = "[A-Z][A-Za-z_0-9]*";

var Basic = {
};

function _parseParameterList(str) {
    return _.map(str.split(','), $.trim);
}

function Statement() {
}

Statement.prototype.init = function(source, program) {
    this.source = source;
    this.program = program;
    this.parser = program.parser;
    this.id = +_.uniqueId();
    var match = source.match(this.syntax);
    this.matches = match;
    if (!match) {
        this.invalid = true;
    } else {
        try {
            this.initmatch(match);
        } catch (e) {
            this.invalid = true;
            console.error('Init error', source, e);
        }
    }
}

Statement.prototype.parseExpressionList = function(str) {
    var re = new RegExp(EXPRESSION_REGEX, 'g');
    var result = [], match;
    while (match = re.exec(str)) {
        result.push(this.parser.parse($.trim(match[0])));
    }
    return result;
};

Statement.prototype.initmatch = function(match) {
};

Statement.prototype.execute = function(context) {
    throw "Unimplemented: " + this.source;
};

Statement.prototype.skipBlock = function(processor) {
    processor.nextStatement = this.nextStatement(false);
    var l = this.children.length;
    return l ? this.children[l - 1] : null;
};

Statement.prototype.addStatement = function(statement, linear) {
    if (!this.startsBlock) {
        throw "Cannot add to: " + this.source;
    }
    if (this.children == Statement.prototype.children) {
        this.children = [];
    }
    if (linear) {
        this.children.push(statement);
    } else {
        this.children.splice(-1,0,statement);
    }
    statement.setParent(this);
};

Statement.prototype.setParent = function(parent) {
    this.parent = parent;
};

Statement.prototype.nextStatement = function(children) {
    if (children && this.children.length) {
        return this.children[0];
    } else {
        var context = this, next = context.nextSibling();
        while (context.parent && context.parent.parent && !next) {
            if (!context.endsBlock) {
                throw "Unexpected end: " + context.source;
            }
            context = context.parent;
            next = context.nextSibling();
        }
        return next;
    }
}

Statement.prototype.nextSibling = function() {
    var siblings = this.parent.children, index = _.indexOf(siblings, this);
    if (index < 0) {
        throw "Abnormal end";
    }
    return (index + 1 < siblings.length) ? siblings[index + 1] : null;
}

Statement.prototype.isInvalid = function() {
    return this.invalid;
}

Statement.prototype.getSyntax = function() {
    return "Syntax: " + this.syntaxHelp;
}

Statement.prototype.getSource = function() {
    return this.source || this.toSource();
}

Statement.prototype.toSource = function() {
    throw "Unimplemented";
}

Statement.prototype.startsBlock = false;

Statement.prototype.endsBlock = false;

Statement.prototype.description = 'This statement does not have a helpful description.';

Statement.prototype.syntaxHelp = '<span class="sy-keyword">Syntax goes here</span>';

Statement.prototype.children = [];

Statement.prototype.tokenLabels = [];

// ProgramStatement

function ProgramStatement() {
    this.parser = new Parser();
    this.parser.functions = Object.create(this.parser.functions);
    this.functions = {};
}

ProgramStatement.prototype = Object.create(Statement.prototype);

ProgramStatement.prototype.constructor = ProgramStatement;

ProgramStatement.prototype.startsBlock = true;

ProgramStatement.prototype.keyword = "Program";

ProgramStatement.prototype.syntax = "";

ProgramStatement.prototype.addStatement = function(statement) {
    Statement.prototype.addStatement.apply(this, arguments);
    if ((statement instanceof FunctionStatement) && !statement.isInvalid()) {
        this.functions[statement.name] = statement;
    }
}

ProgramStatement.prototype.addLibrary = function(library) {
    _.each(library.functions, function(fn) {
        this.functions[fn.name] = this.functions[fn.name] || fn;
    });
}

// EndProgramStatement

function EndProgramStatement() {
}

EndProgramStatement.prototype = Object.create(Statement.prototype);

EndProgramStatement.prototype.constructor = EndProgramStatement;

EndProgramStatement.prototype.endsBlock = true;

EndProgramStatement.prototype.keyword = "End Program";

EndProgramStatement.prototype.syntax = "";

EndProgramStatement.prototype.execute = function(processor) {
    processor.halted = true;
}

EndProgramStatement.prototype.toSource = function() {
    return "";
}

// BlankStatement

function BlankStatement() {
}

BlankStatement.prototype = Object.create(Statement.prototype);

BlankStatement.prototype.constructor = BlankStatement;

BlankStatement.prototype.execute = function() {
}

BlankStatement.prototype.keyword = "Blank";

BlankStatement.prototype.syntax = "^\\s*$";

BlankStatement.prototype.description = "The computer ignores blank lines.";

BlankStatement.prototype.toSource = function() {
    return "";
}

// CommentStatement

function CommentStatement() {
}

CommentStatement.prototype = Object.create(Statement.prototype);

CommentStatement.prototype.constructor = CommentStatement;

CommentStatement.prototype.initmatch = function(match) {
    this.remark = match[1];
}

CommentStatement.prototype.execute = function() {
}

CommentStatement.prototype.toSource = function() {
    return "// " + this.remark;
}

CommentStatement.prototype.keyword = "Comment";

CommentStatement.prototype.syntax = "^//\\s*(.*)$";

CommentStatement.prototype.description = "The computer ignores comments. They are used to help you or someone else understand the code.";

// InvalidStatement

function InvalidStatement() {
}

InvalidStatement.prototype = Object.create(Statement.prototype);

InvalidStatement.prototype.constructor = InvalidStatement;

InvalidStatement.prototype.isInvalid = function() {
    return true;
}

InvalidStatement.prototype.keyword = "Invalid";

InvalidStatement.prototype.syntax = "^(.*)$";

InvalidStatement.prototype.description = "The computer does not understand what this statement means.";

// LetStatement

function LetStatement() {
}

LetStatement.prototype = Object.create(Statement.prototype);

LetStatement.prototype.constructor = LetStatement;

LetStatement.prototype.initmatch = function(match) {
    this.variable = match[1];
    this.value = this.parser.parse(match[2]);
}

LetStatement.prototype.execute = function(processor) {
    processor.variables[this.variable] = processor.evaluate(this.value);
}

LetStatement.prototype.keyword = "LET";

LetStatement.prototype.syntax = "^LET\\s+(" + VARIABLE_REGEX + ")\\s*=\\s*(" + EXPRESSION_REGEX + ")\\s*$";

LetStatement.prototype.tokenLabels = ['Variable', 'Value'];

LetStatement.prototype.description = "This statement assigns a value to variable.";

LetStatement.prototype.syntaxHelp = '<span class="sy-keyword">LET</span> <span class="sy-variable">variable</span> = <span class="sy-expression">expression</span>';

LetStatement.prototype.toSource = function() {
    var code = "LET " + this.variable + " = " + this.value.toString();
    return code;
}

// TellStatement

function TellStatement() {
}

TellStatement.prototype = Object.create(Statement.prototype);

TellStatement.prototype.constructor = TellStatement;

TellStatement.prototype.initmatch = function(match) {
    this.object = match[1];
    this.method = match[2];
    this.parameters = this.parseExpressionList(match[3]);
}

TellStatement.prototype.execute = function(processor) {
    var parameters = _.map(this.parameters, processor.evaluate, processor);
    processor.io.interrupt(this.method, parameters);
}

TellStatement.prototype.keyword = "TELL";

TellStatement.prototype.syntax = "^TELL\\s+(" + VARIABLE_REGEX + ")\\s*:\\s*(" + FUNCTION_REGEX + ")\\s*\\((\\s*" + EXPRESSION_REGEX + "\\s*(?:,\\s*" + EXPRESSION_REGEX + ")*)\\)\\s*$";

TellStatement.prototype.tokenLabels = ["Object to call", "Function to call", "Value to pass in"];

TellStatement.prototype.syntaxHelp = '<span class="sy-keyword">TELL</span> <span class="sy-variable">object</span> : <span class="sy-function">Function</span>(<span class="sy-expression">expression</span>, ...)'

TellStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.object + " : " + this.method + "(" + _.map(this.parameters, Parser.Expression.prototype.toString).join(", ") + ")";
    return code;
}

// FunctionStatement

function FunctionStatement() {
}

FunctionStatement.prototype = Object.create(Statement.prototype);

FunctionStatement.prototype.constructor = FunctionStatement;

FunctionStatement.prototype.setParent = function(parent) {
    this.parent = parent;
    var i = _.indexOf(parent.children, this);
    var prev = (i > 0) ? parent.children[i - 1] : null;
    if (prev instanceof CommentStatement) {
        this.description = prev.remark;
    }
};

FunctionStatement.prototype.initmatch = function(match) {
    this.name = match[1];
    this.parameterNames = match[2] ? _parseParameterList(match[2]) : [];
}

FunctionStatement.prototype.execute = function(processor) {
    if (!processor.stack.length || (processor.stack.slice(-1)[0].callee != this)) {
        var statement = this.skipBlock(processor);
        if (!(statement instanceof EndFunctionStatement)) {
            throw "Unexpected: " + statement.source;
        }
    }
}

FunctionStatement.prototype.invoke = function(processor, parameters) {
    if (parameters.length != this.parameterNames.length) {
        throw 'Incorrect parameters: ' + this.source + ' (received: ' + parameters.join(', ') + ')';
    }
    processor.stack.push({
        callee: this,
        caller: processor.statement,
        variables: processor.variables
    });
    processor.nextStatement = this;
    processor.variables = _.reduce(this.parameterNames, function(map, name, index) {
        map[name] = parameters[index];
        return map;
    }, {});
}

FunctionStatement.prototype.startsBlock = true;

FunctionStatement.prototype.keyword = "FUNCTION";

FunctionStatement.prototype.syntax = "^FUNCTION\\s+(" + FUNCTION_REGEX + ")\\b\\s*\\(\\s*(" + VARIABLE_REGEX + "(?:\\s*,\\s*" + VARIABLE_REGEX + ")*)?\\s*\\)\\s*$";

FunctionStatement.prototype.tokenLabels = ["Name", "Input Parameter"];

FunctionStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.name + "(" + this.parameterNames + ")";
    return code;
}

// End FunctionStatement

function EndFunctionStatement() {
}

EndFunctionStatement.prototype = Object.create(Statement.prototype);

EndFunctionStatement.prototype.constructor = EndFunctionStatement;

EndFunctionStatement.prototype.execute = function(processor) {
    var stack = processor.stack.pop();
    processor.nextStatement = stack.caller.nextStatement(false);
    processor.variables = stack.variables;
}

EndFunctionStatement.prototype.endsBlock = true;

EndFunctionStatement.prototype.keyword = "END FUNCTION";

EndFunctionStatement.prototype.syntax = "^END FUNCTION\\s*$";

EndFunctionStatement.prototype.toSource = function() {
    var code = this.keyword;
    return code;
}

// ForStatement

function ForStatement() {
}

ForStatement.prototype = Object.create(Statement.prototype);

ForStatement.prototype.constructor = ForStatement;

ForStatement.prototype.initmatch = function(match) {
    this.variable = match[1];
    this.start = this.parser.parse(match[2]);
    this.stop = this.parser.parse(match[3]);
}

ForStatement.prototype.execute = function(processor) {
    var start = processor.evaluate(this.start);
    processor.variables[this.variable] = start;
}

ForStatement.prototype.startsBlock = true;

ForStatement.prototype.keyword = "FOR";

ForStatement.prototype.syntax = "^FOR\\s+(" + VARIABLE_REGEX + ")\\s+=\\s+(" + EXPRESSION_REGEX + ")\\s+TO\\s+(" + EXPRESSION_REGEX + ")\\s*$";

ForStatement.prototype.tokenLabels = ["Variable to loop", "Start at", "Go to"];

ForStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.start.toString() + " TO " + this.stop.toString();
    return code;
}

// NextStatement

function NextStatement() {
}

NextStatement.prototype = Object.create(Statement.prototype);

NextStatement.prototype.constructor = NextStatement;

NextStatement.prototype.initmatch = function(match) {
    this.variable = match[1];
}

NextStatement.prototype.execute = function(processor) {
    if (!(this.parent instanceof ForStatement)) {
        throw("Error: Unexpected " + this.source);
    } else if (this.parent.variable != this.variable) {
        throw("Error: Mismatched " + this.source);
    }
    var value = 1 + processor.variables[this.variable];
    var stop = processor.evaluate(this.parent.stop);
    if (value <= stop) {
        processor.variables[this.variable] = value;
        processor.nextStatement = this.parent.children[0];
    }
}

NextStatement.prototype.endsBlock = true;

NextStatement.prototype.keyword = "NEXT";

NextStatement.prototype.syntax = "^NEXT\\s+(" + VARIABLE_REGEX + ")\\s*$";

NextStatement.prototype.tokenLabels = ["Variable"];

NextStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.variable.toString();
    return code;
}

// IfStatement

function IfStatement() {
}

IfStatement.prototype = Object.create(Statement.prototype);

IfStatement.prototype.constructor = IfStatement;

IfStatement.prototype.initmatch = function(match) {
    this.expression = this.parser.parse(match[1]);
}

IfStatement.prototype.execute = function(processor) {
    var expression = processor.evaluate(this.expression);
    if (!expression) {
        var statement = this.skipBlock(processor);
        if (!(statement instanceof EndIfStatement)) {
            throw "Unexpected: " + statement.source;
        }
    }
}

IfStatement.prototype.startsBlock = true;

IfStatement.prototype.keyword = "IF";

IfStatement.prototype.syntax = "^IF\\s+(" + EXPRESSION_REGEX + ")\\s+THEN\\s*$";

IfStatement.prototype.tokenLabels = ["Expression"];

IfStatement.prototype.syntaxHelp = '<span class="sy-keyword">IF</span> <span class="sy-expression">expression</span> <span class="sy-keyword">THEN</span>';

IfStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.expression.toString() + " THEN";
    return code;
}

// EndIfStatement

function EndIfStatement() {
}

EndIfStatement.prototype = Object.create(Statement.prototype);

EndIfStatement.prototype.constructor = EndIfStatement;

EndIfStatement.prototype.execute = function(processor) {
}

EndIfStatement.prototype.endsBlock = true;

EndIfStatement.prototype.keyword = "END IF";

EndIfStatement.prototype.syntax = "^END\\s+IF\\s*$";

EndIfStatement.prototype.toSource = function() {
    var code = this.keyword;
    return code;
}

// RepeatStatement

function RepeatStatement() {
}

RepeatStatement.prototype = Object.create(Statement.prototype);

RepeatStatement.prototype.constructor = RepeatStatement;

RepeatStatement.prototype.execute = function(processor) {
}

RepeatStatement.prototype.startsBlock = true;

RepeatStatement.prototype.keyword = "REPEAT";

RepeatStatement.prototype.syntax = "^REPEAT\\s*$";

RepeatStatement.prototype.toSource = function() {
    var code = this.keyword;
    return code;
}

// UntilStatement

function UntilStatement() {
}

UntilStatement.prototype = Object.create(Statement.prototype);

UntilStatement.prototype.constructor = UntilStatement;

UntilStatement.prototype.initmatch = function(match) {
    this.expression = this.parser.parse(match[1]);
}

UntilStatement.prototype.execute = function(processor) {
    if (!(this.parent instanceof RepeatStatement)) {
        throw("Error: Unexpected " + this.source);
    }
    var value = processor.evaluate(this.expression);
    if (!value) {
        processor.nextStatement = this.parent.children[0];
    }
}

UntilStatement.prototype.endsBlock = true;

UntilStatement.prototype.keyword = "UNTIL";

UntilStatement.prototype.syntax = "^UNTIL\\s+(" + EXPRESSION_REGEX + ")\\s*$";

UntilStatement.prototype.tokenLabels = ["Expression"];

UntilStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.expression;
    return code;
}

// WhileStatement

function WhileStatement() {
}

WhileStatement.prototype = Object.create(Statement.prototype);

WhileStatement.prototype.constructor = WhileStatement;

WhileStatement.prototype.initmatch = function(match) {
    this.expression = this.parser.parse(match[1]);
}

WhileStatement.prototype.execute = function(processor) {
    var value = processor.evaluate(this.expression);
    if (!value) {
        processor.nextStatement = this.nextStatement(false);
    }
}

WhileStatement.prototype.startsBlock = true;

WhileStatement.prototype.keyword = "WHILE";

WhileStatement.prototype.syntax = "^WHILE\\s+(" + EXPRESSION_REGEX + ")\\s*$";

WhileStatement.prototype.tokenLabels = ["Expression"];

WhileStatement.prototype.toSource = function() {
    var code = this.keyword + " " + this.expression;
    return code;
}

// EndWhileStatement

function EndWhileStatement() {
}

EndWhileStatement.prototype = Object.create(Statement.prototype);

EndWhileStatement.prototype.constructor = EndWhileStatement;

EndWhileStatement.prototype.execute = function(processor) {
    if (!(this.parent instanceof WhileStatement)) {
        throw("Error: Unexpected " + this.source);
    }
    var value = processor.evaluate(this.parent.expression);
    if (value) {
        processor.nextStatement = this.parent.children[0];
    }
}

EndWhileStatement.prototype.endsBlock = true;

EndWhileStatement.prototype.keyword = "END WHILE";

EndWhileStatement.prototype.syntax = "^END\\s+WHILE\\s*$";

EndWhileStatement.prototype.toSource = function() {
    var code = this.keyword;
    return code;
}

// FunctionCall

function FunctionCall() {
}

FunctionCall.prototype = Object.create(Statement.prototype);

FunctionCall.prototype.constructor = FunctionCall;

FunctionCall.prototype.initmatch = function(match) {
    this.name = match[1];
    this.parameters = match[2] ? this.parseExpressionList(match[2]) : [];
}

FunctionCall.prototype.execute = function(processor) {
    var fn = this.program.functions[this.name];
    if (!fn) {
        throw "Unknown function: " + this.source;
    }
    var parameters = _.map(this.parameters, processor.evaluate, processor);
    fn.invoke(processor, parameters);
}

FunctionCall.prototype.isInvalid = function() {
    return this.invalid || !this.program.functions[this.name];
}

FunctionCall.prototype.getSyntax = function() {
    if (!this.program.functions[this.name]) {
        return "Unknown function: " + this.name;
    }
    return Statement.prototype.getSyntax.call(this);
}

FunctionCall.prototype.keyword = "Function Call";

FunctionCall.prototype.syntax = "^(" + FUNCTION_REGEX + ")\\s*\\(\\s*(" + EXPRESSION_REGEX + "(,\\s*" + EXPRESSION_REGEX + ")*)?\\s*\\)\\s*$";

FunctionCall.prototype.tokenLabels = ['Function to call', 'Parameters'];


FunctionCall.prototype.syntaxHelp = '<span class="sy-function">Function</span>(<span class="sy-expression">expression</span>, ...)';

FunctionCall.prototype.toSource = function() {
    var code = this.name + "(" + this.parameters + ")";
    return code;
}

// Basic

Basic.statements = [
    LetStatement,
    TellStatement,
    IfStatement,
    EndIfStatement,
    ForStatement,
    NextStatement,
    RepeatStatement,
    UntilStatement,
    WhileStatement,
    EndWhileStatement,
    FunctionStatement,
    EndFunctionStatement
];

Basic.parseProgram = function(sources) {
    var program = new ProgramStatement(), context = program;
    _.each(sources, function(source, line) {
        var statement = Basic.parseStatement(source, program);
        statement.line = line;
        if (context == null) {
            program.addStatement(statement, true);
        } else {
            context.addStatement(statement, true);
        }
        if (statement.startsBlock) {
            context = statement;
        } else if (statement.endsBlock) {
            context = context && context.parent;
        }
    });
    program.addStatement(new EndProgramStatement(), true);
    program.parser.functions.robot = {};
    program.parser.functions.ASK = function(r, q) { 
        var a = program.processor.io.interrupt(r, []);
        console.log('ask', r, a);
    };
    return program;
}

Basic.parseStatement = function(source, program) {
    source = $.trim(source);
    var statement = _.find(Basic.statements, function(s) {
        var match = '^' + s.prototype.keyword.replace(' ', '\\s+') + '\\b';
        return new RegExp(match).test(source);
    });
    if (!statement) {
        if (source == '') {
            statement = BlankStatement;
        } else if (source.indexOf('//') == 0) {
            statement = CommentStatement;
        } else {
            var match = source.match('^(' + FUNCTION_REGEX + ')\\b\\s*\\(');
            if (!match) {
                statement = InvalidStatement;
            }  else {
                statement = FunctionCall;
            }
        }
    }
    var stmt = new statement();
    stmt.init(source, program);
    return stmt;
};
