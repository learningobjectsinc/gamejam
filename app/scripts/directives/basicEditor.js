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
				ace.gotoLine(line+1);
				ace.setHighlightActiveLine(true);

				var session = ace.getSession();
				session.removeGutterDecoration(prevLine, 'current');
				session.addGutterDecoration(line, 'current');
				prevLine = line;
			});

			$scope.$watch('program.statements', function(statements){
				if(!program.processor){
					return;
				}
				var session = ace.getSession();
				$('.invalid').removeClass('invalid'); // muahahahahahandrewmuahahahahahaaa
				var index = 0;
				for (var stmt = statements.children[0]; stmt; stmt = stmt.nextStatement(true)) {
					var invalid = stmt.invalid;
					if ((typeof invalid == 'function') ? stmt.invalid(program.processor) : invalid) {
						session.addGutterDecoration(index, 'invalid');
					}
					++ index;
				}
			});

			var ace = null;
			$scope.aceLoaded = function(editor){
				ace = editor;
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
