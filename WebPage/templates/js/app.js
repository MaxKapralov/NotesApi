var app = angular.module("NotesAPI", ["ngRoute"]);
var token;

app.config(function($routeProvider)
{
	$routeProvider.when("/NotesApp",
	{
		templateUrl: "login.html",
		controller: "loginCtrl"
	});
	$routeProvider.when("/myNotes",
        {
                templateUrl: "addNewNote.html",
                controller: "mainCtrl"
        });
	$routeProvider.when("/newNote",
        {
                templateUrl: "addNewNote.html",
                controller: "mainCtrl"
        });
	$routeProvider.when("/search",
        {
                templateUrl: "search.html",
                controller: "mainCtrl"
        });
	$routeProvider.when("/allNotes",
        {
                templateUrl: "myNotes.html",
                controller: "mainCtrl"
        });
	$routeProvider.when("/showNote/:id",
	{
		templateUrl: "showNote.html",
		controller: "mainCtrl"
	});

	$routeProvider.when("/editNote/:id",
	{
		templateUrl: "editNote.html",
		controller: "mainCtrl"
	});	
	

	$routeProvider.otherwise({redirectTo: '/NotesApp'});

});

app.filter('LimitSymb', function(){
        return function(text){
                if(text.length > 30)
                {
                        var str = text.slice(0, 30) + "...";
                        return str;
                }
                else
                        return text;
        }
})

app.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});

