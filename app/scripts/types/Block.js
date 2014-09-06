"use strict";

angular.module('gamejamApp').factory('Block', function(){
	var Block = function(archtype){
		_.extend(this,angular.copy(archtype));
		this.id = _.uniqueId();
	};

	return Block;
});