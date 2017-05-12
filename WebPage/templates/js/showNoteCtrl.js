app.controller("showNoteCtrl", 
	function showNoteCtrl($scope, $location, $http, $routeParams)
	{
		var url = 'http://edi.iem.pw.edu.pl/kapralam/notes/api/notes/' + $routeParams.id;
		$http.get(url, {headers: {'token': token}}).
		then(function successCallback(response)
		{
			$scope.myNote = response.data.note;
			var text = "";
			for(var i = 0; i < response.data.note.tags.length; i++)
				text += response.data.note.tags[i] + " ";
			$scope.myTags = text;
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

		$scope.deleteNote = function(id)
		{
			var url = 'http://edi.iem.pw.edu.pl/kapralam/notes/api/notes/' + id;
			$http.delete(url, {headers: {'token':token}}).
			then(function successCallback(response)
			{
				alert("The note was deleted");
				$location.path("/allNotes");
				
			},function errorCallback(response)
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

		$scope.edit = function(id)
		{
			var url = '/editNote/' + id;
			$location.path(url);
		}

	})
