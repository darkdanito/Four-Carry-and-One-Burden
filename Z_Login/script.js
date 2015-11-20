// JavaScript Document

var app = angular.module('mainModule', [], function () 			//	Main Controller for the Web Application
{
})

app.controller("mainController", function ($scope, $http, $window, srvShareData)
{	
//	var ref = new Firebase("https://c4posit.firebaseIO.com/").child("user");
	
//	ref.orderByChild("height").on("child_added", function(snapshot) 
//	{
//	  console.log(snapshot.key() + " : " + snapshot.val().full_name + " : ");
//	});


	
	
	$scope.briefCurrentLocation = srvShareData.getData();	
	$scope.briefDestination = srvShareData.getData2();		

	$scope.go = function() 
	{
		console.log("gaaaaa");
		
		console.log(document.getElementById('textbox1').value);
		srvShareData.addData2(document.getElementById('textbox1').value);
		
		$window.location.href = '/Four-Carry-and-One-Burden/Discussion Room.html';
 	}


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
		
//		new Firebase('https://c4posit.firebaseIO.com/user/necrodiver').once('value', function(snap) 
//		{
//       		console.log('I fetched a user!', snap.val().password);
//    	});
		
		
		srvShareData.addData(data.receivedFirstName);
		srvShareData.addData2(data.receivedLastName);
		
		$window.location.href = '/Four-Carry-and-One-Burden/Z_Login/C2_Intranet.html';
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