var EXPR = "[^,]+";

var VAR = "[a-z][a-z_0-9]*";

var FUNCTION = "[A-Z][A-Za-z_0-9]*";

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
    console.log('Interrupt', this.code, parameters);
}

Interrupt.prototype.match = "^INT\\b";

Interrupt.prototype.syntax = "^INT\\s+(0x[0-9a-fA-F]{2}(?:,\\s*" + EXPR + ")*)\\s*$";

// Basic

Basic.statements = [
    Blank,
    Remark,
    Interrupt
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

