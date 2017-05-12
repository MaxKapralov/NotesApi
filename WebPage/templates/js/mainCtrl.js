app.controller("mainCtrl", 
	function mainCtrl($scope, $http, $location)
	{
		$scope.newNoteField = function()
		{
			$location.path('/newNote');
		}

		$scope.searchField = function()
		{
			$location.path('/search');
		}
		
		$scope.myNotesField = function()
		{
			$location.path('/allNotes');
		}
	})
