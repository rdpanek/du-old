'use strict';

/* Controllers */


function TypesCtrl($scope, $location, Types) {
	$scope.types = Types.index();
	$scope.remove = function(_id) {
		Types.remove({_id:_id}, function(){
			$scope.types = Types.index();
            $location.path('/types');
        });
	}
}

function MovementsCtrl($scope, $location, Movements) {
	$scope.movements = Movements.index();
}

function NewTypeCtrl($scope, $location, Types){
    $scope.create = function() {
        Types.create($scope.type, function(){
            $location.path('/types');
        });
    }
    $scope.close = function() {
        $location.path('/types');
    }
}
