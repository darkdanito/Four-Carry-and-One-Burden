var app = angular.module('mainModule', [], function () 			//	Main Controller for the Web Application
{
})

app.controller("mainController", function ($scope, $http, $window, srvShareData)
{	
	$scope.userName = srvShareData.getData();	
	$scope.userPassword = srvShareData.getData2();		

	$scope.go = function() 
	{
		srvShareData.addData2(document.getElementById('roomName').value);
		var inputPassword = document.getElementById('password').value;

		var getterString;
		var getter;
		new Firebase('https://c4posit.firebaseIO.com/roomDetails').child(srvShareData.getData2()[0]).once('value', function(snap) 
		{
			getterString = JSON.stringify( snap.val(), null, 2);
			getter = snap.val();
			
			if ( getterString == 'null')
			{
				console.log("Room Does not exist");
				document.getElementById('roomAlertMessage').innerHTML = "Creating Room ... ";
				
				var myFirebase6 = new Firebase("https://c4posit.firebaseIO.com/roomDetails").child(srvShareData.getData2()[0]);
	
				myFirebase6.update(
				{
					roomName: srvShareData.getData2()[0],
					password: inputPassword,
					roomCreator: srvShareData.getData()[0]
				});
				
				setTimeout(function()
				{
					$window.location.href = '/Four-Carry-and-One-Burden/Discussion Room.html';
				},3000); 
					
			}
			else
			{
				console.log("Room Exist");
				document.getElementById('roomAlertMessage').innerHTML = "Room Exist, Please use another name";
			}
		});
	

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

	};
});

////////////////////////////////////////////////////////////////////////
////////////////////	Cookies Function	   /////////////////////////
////////////////////////////////////////////////////////////////////////
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