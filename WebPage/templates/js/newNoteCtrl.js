app.controller('newNoteCtrl',
	function newNoteCtrl($scope, $http)
	{
		$scope.addNote = function()
		{
			if($scope.newNoteLabel == undefined || $scope.newNoteTags == undefined || $scope.newNote == undefined)
			{
				alert("Please fill in all fields");
				return;
			}
			var body = 
			{
				'token': token,
				'label': $scope.newNoteLabel,
				'tags': $scope.newNoteTags,
				'note': $scope.newNote
			};
			body = JSON.stringify(body);
                        $http.post('http://edi.iem.pw.edu.pl/kapralam/notes/api/notes', body).
                        then(function successCallback(response)
                        {
				$scope.newNoteLabel = "";
				$scope.newNoteTags = "";
				$scope.newNote = "";
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
