'use strict';

/* Services */

angular.module('duServices', ['ngResource'])
    .factory('Types', function($resource){
        return $resource('/api/v1/types/:id', {url:'@id'}, {
            index: {method:'GET', isArray:true},
            create: {method:'POST'},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
    });
});