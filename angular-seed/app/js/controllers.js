'use strict';

/* Controllers */

function MovementsCtrl($scope, $location, Movements) {
	$scope.movements = Movements.index();
	$scope.remove = function(id) {
		Movements.remove({_id:id}, function(){
			$scope.movements = Movements.index();
            $location.path('/moements');
        });
	}
}

function NewMovementCtrl($scope, $location, Movements, Types) {
	$scope.movement = {
		listTypes: Types.index()
	};

	$scope.create = function() {
		Movements.create($scope.movement, function(){
			$location.path('/movements');
		});
	}
}

function TypesCtrl($scope, $location, Types) {
	$scope.types = Types.index();
	$scope.remove = function(id) {
		Types.remove({_id:id}, function(){
			$scope.types = Types.index();
            $location.path('/types');
        });
	}
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


function EditMovementCtrl($scope, $location, Movements, $routeParams){
	$scope.movement = Movements.show({_id: $routeParams.id});
	$scope.update = function(){
		Movements.update({_id: $routeParams.id}, $scope.movement);
		$location.path('/movements');
	}
	$scope.close = function(){
		$location.path('/movements');
	}
}
