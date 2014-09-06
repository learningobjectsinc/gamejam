angular.module('gamejamApp')
    .config(function($stateProvider) {
    	$stateProvider
    		.state('level.intro', {
    			url: '/intro',
    			controller: 'GameIntro',
    			templateUrl: 'views/game/intro.html'
    		})
    });


angular.module('gamejamApp')
  .controller('GameIntro', function ($scope) {
  	angular.noop();
  });
