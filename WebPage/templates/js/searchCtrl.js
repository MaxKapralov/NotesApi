app.controller("searchCtrl",
	function searcCtrl($scope, $http, $location)
	{
		$scope.searchInNotes = function()
		{
			var url = "http://edi.iem.pw.edu.pl/kapralam/notes/api";
			var type = $scope.typeOfSearch;
			$scope.notes = [];
			if(type == undefined)
			{
				alert("Please choose type of search");
				return;
			}
			else if(type == "ByLabel")
			{
				url += "/notes/label/" + $scope.dataForSearch;
			}
			else if(type == "ByTags")
			{
				url += "/notes/tags/" + $scope.dataForSearch;
			}
			
			$http.get(url, {headers: {'token': token}}).
                        then(function successCallback(response)
                        {
				if(response.data.notes.length == 0)
				{
					alert("Not Found")
					return;
				}
                                $scope.notes = response.data.notes;
                        }, function errorCallback(response)
                        {
                                if(response.status == 401)
                                {
                                        alert("Invalid token");
                                }

                                else if(response.status == 404)
                                {
                                        alert("Not Found");
                                }
                        });

		
		}

		$scope.showNote = function(id)
		{
			var url = '/showNote/' + id;
			$location.path(url);
		}
		

		
	})
