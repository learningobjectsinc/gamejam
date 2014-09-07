// Adapted from https://github.com/kriswema/Sublime-BHT-BASIC/blob/master/BHT-BASIC.tmLanguage

define("ace/mode/bhtbasic_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var BHTBASICHighlightRules = function() {

    this.$rules = { start: 
       [ { caseInsensitive: true,
           token: 'support.function.basic.bht',
           regex: '(?:\\b(ABS|APLOAD|ASC|BEEP|CALL|CHAIN|CLS|COMMON|CONST|CURSOR|DATA|DECLARE|DEFREG|DIM|ERASE|FRE|GLOBAL|INSTR|KEY|KEY OFF|KEY ON|KILL|KPLOAD|LEN|LINE INPUT|LOCATE|LOF|OPEN|OUT|POWER|PRINT USING|READ|RESTORE|RESUME|SCREEN|SEARCH|VAL|WAIT|XFILE|(\'|REM)\\s*\\$INCLUDE:\\s*\'.*\')(?!\\$)\\b)',
            },
         { caseInsensitive: true,
           token: 'support.type.bht',
           regex: '(?:\\b(PRIVATE|PUBLIC|STATIC)(?!\\$)\\b)',
            },
         { caseInsensitive: true,
           token: 'support.function.basic.bht',
           regex: '(?:\\b((CLFILE|CLOSE|FIELD|GET|INPUT|PRINT|PUT)\\s?#?)(?!\\$)\\b)',
            },
         {
          caseInsensitive: true,
          token: 'storage.type.bht',
          regex: '(?:\\b(LET)(?!\\$)\\b)'
         },
         { caseInsensitive: true,
           token: 'support.function.basic.bht',
           regex: '(?:\\b((COUNTRY|MID|INKEY|INPUT|STR|TIME)\\$))',
            },
         { caseInsensitive: true,
           token: 'keyword.control.bht',
           regex: '(?:\\b(((END(\\s)?)?(FUNCTION|IF|SELECT|SUB|WHILE))|(GO(SUB|(\\s)?TO))|(CASE|DEF FN|ELSE|END DEF|EXIT SUB|FOR|NEXT|ON|ON ERROR GOTO|ON KEY|RETURN|SELECT CASE|THEN|WEND|WHILE|LOOP|TELL|REPEAT|UNTIL))\\b)',
            },
         { token: 'string.quoted.double.bht',
           regex: '"[^"]*"',
            },
          { token: 'string.quoted.single.bht',
             regex: '\'[^\']*\'',
            },
         { token: 'variable.other.bht',
           regex: '\\b([a-zA-Z\\d]+(\\$|%|&))\\s*(\\[\\d+\\])?',
            },
         { token: 'constant.numeric.bht',
           regex: '(\\b\\d+|&h\\w+)\\b',
            },
         { token: 'keyword.operator.bht',
           regex: '(\\*|/|\\+|-|=|<>|><|<|>|<=|>=|=<|=>|:|,|;|\\(|\\)|\\[|\\])',
            },
         { caseInsensitive: true,
           token: 'keyword.operator.bht',
           regex: '(?:\\b(MOD|NOT|AND|OR|XOR|AS|TO)\\b)',
            } ] }
    
    this.normalizeRules();
};

oop.inherits(BHTBASICHighlightRules, TextHighlightRules);

exports.BHTBASICHighlightRules = BHTBASICHighlightRules;
});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };

}).call(FoldMode.prototype);

});

define("ace/mode/bhtbasic",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/bhtbasic_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var BHTBASICHighlightRules = require("./bhtbasic_highlight_rules").BHTBASICHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = BHTBASICHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
}).call(Mode.prototype);

exports.Mode = Mode;
});
