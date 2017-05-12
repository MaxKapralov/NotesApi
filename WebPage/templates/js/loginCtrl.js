app.controller("loginCtrl",
	function loginCtrl($scope, $location, $http)
	{
		$scope.loginFun = function()
		{
			var body = 
			{
				'login': $scope.login,
				'password': $scope.password
			};
			body = JSON.stringify(body);
			$http.post('http://edi.iem.pw.edu.pl/kapralam/notes/api/login', body).
			then(function successCallback(response)
			{
				token = response.data.token;
				$location.path("/myNotes");
			}, function errorCallback(response)
			{
				if(response.status == 404)
				{
					alert("Invalid data");
					return;
				}
			});
				
		}
	})
