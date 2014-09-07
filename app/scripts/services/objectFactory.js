"use strict";

angular.module('gamejamApp').factory('objectFactory', function($rootScope){
	var objectRegistry = {};

	this.registerObject = function(key, constructor) {
		objectRegistry[key] = constructor;
	};

	this.newObject = function(key, config, scope) {
		var constructor = objectRegistry[key]
		var instance = new constructor(config, scope);
		return instance;
	};

	return this;
});