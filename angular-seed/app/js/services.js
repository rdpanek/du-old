'use strict';

/* Services */

angular.module('duServices', ['ngResource'])
    .factory('Types', function($resource){
        return $resource('/api/v1/types/:_id', {_id:'@_id'}, {
            index: {method:'GET', isArray:true},
            show: {method:'GET'},
            create: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
    	});
	})
	.factory('Movements', function($resource){
		return $resource('/api/v1/movements/:_id', {_id:'@_id'}, {
            index: {method:'GET', isArray:true},
            show: {method:'GET'},
            create: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
    	});
	});

