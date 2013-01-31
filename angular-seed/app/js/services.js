'use strict';

/* Services */

angular.module('duServices', ['ngResource'])
    .factory('Types', function($resource){
        return $resource('/api/v1/types/:_id', {_id:'@_id'}, {
            index: {method:'GET', isArray:true},
            create: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
    	});
	})
	.factory('Movements', function($resource){
		return $resource('/api/v1/movements/:id', {url:'@id'}, {
            index: {method:'GET', isArray:true},
            create: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
    	});
	});

