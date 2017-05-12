app.controller("editNoteCtrl",
	function editNoteCtrl($scope, $http, $location, $routeParams)
	{
		var url = 'http://edi.iem.pw.edu.pl/kapralam/notes/api/notes/' + $routeParams.id;
                $http.get(url, {headers: {'token': token}}).
                then(function successCallback(response)
                {
                        $scope.editNoteLabel = response.data.note.label;
                        var text = "";
                        for(var i = 0; i < response.data.note.tags.length; i++)
                                text += response.data.note.tags[i] + " ";
                        $scope.editNoteTags = text;
			$scope.editNote = response.data.note.note;
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
	
		$scope.editMyNote = function()
		{	
			if($scope.editNoteLabel == undefined || $scope.editNoteTags == undefined || $scope.editNote == undefined)
                        {
                                alert("Please fill in all fields");
                                return;
                        }

                        var body =
                        {
                                'token': token,
                                'label': $scope.editNoteLabel,
                                'tags': $scope.editNoteTags,
                                'note': $scope.editNote
                        };
                        body = JSON.stringify(body);
			url = 'http://edi.iem.pw.edu.pl/kapralam/notes/api/notes/' + $routeParams.id;
                        $http.put(url, body).
                        then(function successCallback(response)
                        {
				$location.path('/allNotes');
				
                        }, function errorCallback(response)
                        {
                                if(response.status == 401)
                                {
                                        alert("Invalid token");
                                }

                                else if(response.status == 404)
                                {
                                        alert("Invalid data");
                                }
                        });	
		}
	})
