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
