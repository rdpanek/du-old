'use strict';

/* Controllers */


function TypesCtrl($scope, $location, Types) {
	$scope.types = Types.index();
}

function MovementsCtrl() {
}
