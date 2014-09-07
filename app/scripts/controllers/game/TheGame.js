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
  .controller('TheGame', function ($scope, $state, Program) {
    $scope.program = new Program();
    $scope.isMusicOn = false;

    $scope.toggleMusic = function() {
        $scope.isMusicOn = !$scope.isMusicOn;
        if ($scope.isMusicOn) {
            $('#music')[0].play();
        } else {
            $('#music')[0].pause();
        }
    };

    $scope.$on('win', function() {
        $state.go('^.wrapup');
    });
  });
