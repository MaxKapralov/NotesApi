app.controller("allNotesCtrl",
	function($scope, $http, $location)
	{
		var url = 'http://edi.iem.pw.edu.pl/kapralam/notes/api/allNotes';
                $http.get(url, {headers: {'token': token}}).
                then(function successCallback(response)
                {
                        $scope.notes = response.data.allNotes
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

		$scope.showNote = function(id)
                {
                        var url = '/showNote/' + id;
                        $location.path(url);
                }

	})
