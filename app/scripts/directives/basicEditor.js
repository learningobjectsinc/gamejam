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

			var prevLine = null;
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

			$scope.$watch('program.statements', function(statements){
				if(!program.processor){
					return;
				}

				$('.invalid').removeClass('invalid'); // muahahahahahandrewmuahahahahahaaa
				var index = 0;
				var lastChild, line, offset;

				rl.removeAll();

				var firstChar = new RegExp('[^ ]');

				for (var stmt = statements.children[0]; stmt; stmt = stmt.nextStatement(true)) {
					var invalid = stmt.invalid;
					if ((typeof invalid == 'function') ? stmt.invalid(program.processor) : invalid) {
						session.addGutterDecoration(index, 'invalid');
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

			$scope.variables = function(){
				if(!program.processor){
					return;
				}
				return _.reduce(program.processor.variables, function(str, value, variable) { 
					return str + '<div>' + variable + ' = ' + value + '</div>';
				}, '');
			};

		}, link: function(scope, el){
			var existingSource = el.find('.prefill').val();
			scope.program.code = existingSource;
		}
	};
});
