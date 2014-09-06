'use strict';


angular.module('gamejamApp').config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('home',{
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'views/home.html'
	}).state('about', {
		url: '/about',
		templateUrl: 'views/about.html'
	}).state('game', {
		url: '/game/:levelId',
		controller: 'GameCtrl',
		templateUrl: 'views/game/container.html',
		abstract: true
	}).state('game.intro', {
		url: '/intro',
		controller: 'GameIntro',
		templateUrl: 'views/game/intro.html'
	}).state('game.play', {
		url: '/play',
		controller: 'TheGame',
		templateUrl: 'views/game/play.html'
	}).state('game.wrapup', {
		url: '/wrapup',
		controller: 'GameWrapup',
		templateUrl: 'views/game/wrapup.html'
	}).state('basic', {
		url: '/basic',
		controller: 'BasicCtrl',
		templateUrl: 'views/basic.html'
	});

	$urlRouterProvider.otherwise('/');
});
