// JavaScript Document

var app = angular.module('mainModule', [], function () 			//	Main Controller for the Web Application
{
})

	app.controller("mainController", function ($scope, $http, $window, srvShareData)
	{
	$scope.person1 = {};
	$scope.person2 = {};
	$scope.person3 = {};
	
	$scope.briefCurrentLocation = srvShareData.getData();	
	$scope.briefDestination = srvShareData.getData2();		
	
	$scope.submitData = function (person, resultVarName)
	{
		var config = 
		{
		params: 
		{
			person: person
		}
	};
	
	$http.post("server.php", null, config)
	.success(function (data, status, headers, config)
	{
		$scope[resultVarName] = data;
		
		console.log(data);
		console.log(data.receivedFirstName);
		console.log(data.receivedLastName);
		srvShareData.addData(data.receivedFirstName);
		srvShareData.addData2(data.receivedLastName);
		
		$window.location.href = '/Four-Carry-and-One-Burden/Z_Login/index2.html';
	})
	.error(function (data, status, headers, config)
	{
		$scope[resultVarName] = "SUBMIT ERROR";
	});
	};
});

app.service('srvShareData', function($window) 				//	Cookie Function
{
        var KEY = 'App.currentLocation';					//	Cookie Name for Current Location
		var KEY2 = 'App.destination';						// 	Cookie Name for Destination

        var addData = function(newObj) 						//	Set Function for Current Location
		{		
            var mydata = $window.sessionStorage.getItem(KEY);	// Attempt to Find the Cookie for Current Location
			
            if (mydata) 									// If Exist 
			{
                mydata = JSON.parse(mydata);
            } 
			else 											// Else Create a new one
			{
                mydata = [];
            }
			
			mydata[0] = newObj;								//	Update the Object's current Destination

            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));	// Update the Cookie
        };

        var getData = function()							// Get Function for Current Location
		{
            var mydata = $window.sessionStorage.getItem(KEY);	// Attempt to Find the Cookie for Current Location
			
            if (mydata) 									// If Exist
			{
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        };

        var addData2 = function(newObj) 					//	Set Function for Destination
		{
            var mydata = $window.sessionStorage.getItem(KEY2);	// Attempt to Find the Cookie for Destination
			
            if (mydata) 									// If Exist
			{
                mydata = JSON.parse(mydata);
            } 
			else 											// Else Create a new one
			{
                mydata = [];
            }
			mydata[0] = newObj;								//	Update the Object's current Destination
			
            $window.sessionStorage.setItem(KEY2, JSON.stringify(mydata));	//	Update the Object's current Destination
        };

        var getData2 = function()							// Get Function for Destination
		{
            var mydata = $window.sessionStorage.getItem(KEY2);	// Attempt to Find the Cookie for Destination
			
            if (mydata) 									// If Exist
			{
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        };

        return {
            addData: addData,
            getData: getData,
			addData2: addData2,
            getData2: getData2
        };
});