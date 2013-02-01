'use strict';

/* Controllers */


function TypesCtrl($scope, $location, Types) {
	$scope.types = Types.index();
	$scope.remove = function(id) {
		Types.remove({_id:id}, function(){
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


function EditTypeCtrl($scope, $location, Types, $routeParams){
	$scope.type = Types.show({_id: $routeParams.id});
	$scope.update = function(){
		Types.update({_id: $routeParams.id}, $scope.type);
		$location.path('/types');
	}
	$scope.close = function(){
		$location.path('/types');
	}
}
