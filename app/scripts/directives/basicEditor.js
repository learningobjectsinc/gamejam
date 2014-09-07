"use strict";

angular.module('gamejamApp').directive('basicEditor', function(){
	return {
		restrict: 'EA',
		templateUrl: 'views/basicEditor.html',
		scope: {
			'program': '=basicEditor'
		},
		controller: function($scope){
			var program = $scope.program;

			var prevLine = null, prevCrash = null;
			$scope.$watch('program.processor.pc', function(line){
				if(!program.processor){
					return;
				}
				editor.gotoLine(line+1);
				editor.setHighlightActiveLine(true);

				var session = editor.getSession();
				session.removeGutterDecoration(prevLine, 'current');
				session.addGutterDecoration(line, 'current');
				prevLine = line;
			});

			$scope.$watch('program.processor.crashed', function(crashed){
				if(!program.processor){
					return;
				}
			        var session = editor.getSession();
				session.removeGutterDecoration(prevCrash, 'crashed');
                                if (crashed) {
				    session.addGutterDecoration(program.processor.pc, 'crashed');
                                    prevCrash = program.processor.pc;
                                }
			});

			$scope.$watch('program.statements', function(statements){
				if(!program.processor){
					return;
				}

				var index = 0;
				var lastChild, line, offset;

				rl.removeAll();

				var firstChar = new RegExp('[^ ]');

                                var annotations = [];

				for (var stmt = statements.children[0]; stmt; stmt = stmt.nextStatement(true)) {
					if (stmt.isInvalid()) {
                                            annotations.push({ row: stmt.line, column: 0, html: 'Error<br />' + stmt.getSyntax(), type: 'warning' });
					}

					if(stmt.source){
						lastChild = {};
						line = null;
						offset =0;

						if(!_.isEmpty(stmt.children)){
							lastChild = _.last(stmt.children);
							line = session.getLine(lastChild.line);
							offset = line.match(firstChar).index;
							var range = new Range(stmt.line, offset, lastChild.line, line.length);
						} else {
							line = session.getLine(stmt.line);
							offset = line.match(firstChar).index;
							var range = new Range(stmt.line, offset, stmt.line, line.length);
						}

						rl.add(range);
						session.addMarker(range, 'stmt stmt_' + stmt.id, 'text');
					}
					++ index;
				}
                                session.setAnnotations(annotations);
			});

			var Range = ace.require('ace/range').Range;
			var RangeList = ace.require('ace/range_list').RangeList;
			var rl = new RangeList();

			var editor, session;
			$scope.aceLoaded = function(editorInstance){
				editor = editorInstance;
				session = editor.getSession();
				rl.attach(session);
			};

			$scope.console = function(){
				if(!program.io){
					return '';
				}
				return _.map(program.io.console, function(ln){
					return '<div>' + ln + '</div>';
				}).join('');
			};

		}, link: function(scope, el){
			if(!scope.program.code){
				var existingSource = el.find('.prefill').val();
				scope.program.code = existingSource;				
			}
		}
	};
});
