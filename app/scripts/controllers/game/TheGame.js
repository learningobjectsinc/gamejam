angular.module('gamejamApp')
    .config(function($stateProvider) {
    	$stateProvider
    		.state('level.play', {
    			url: '/play',
    			controller: 'TheGame',
    			templateUrl: 'views/game/play.html'
    		})
    });

angular.module('gamejamApp')
  .controller('TheGame', function ($scope, Program) {
    $scope.program = new Program();
    $scope.isSoundOn = false;

    $scope.toggleSound = function() {
        $scope.isSoundOn = !$scope.isSoundOn;
        if ($scope.isSoundOn) {
            $('#music')[0].play();
        } else {
            $('#music')[0].pause();
        }
    };
  });
