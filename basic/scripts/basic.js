var Basic = {
};

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

// Basic

Basic.statements = [
    Blank
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

