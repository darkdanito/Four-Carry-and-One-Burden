var app = angular.module('mainModule', [], function () 			//	Main Controller for the Web Application
{
})

app.controller("mainController", function ($scope, $http, $window, srvShareData)
{	
	$scope.userName = srvShareData.getData();	
	$scope.userPassword = srvShareData.getData2();		

	$scope.go = function() 
	{
		srvShareData.addData2(document.getElementById('textbox1').value);
		
		console.log(srvShareData.getData());
		console.log(srvShareData.getData2());
		
		var inputPassword = document.getElementById('password').value;
		console.log(inputPassword);
		
		var myFirebase6 = new Firebase("https://c4posit.firebaseIO.com/roomDetails").child(srvShareData.getData2()[0]);
		
			myFirebase6.update(
			{
//			  inputPassword: 
//			  {
				roomName: srvShareData.getData2()[0],
				password: inputPassword,
				roomCreator: srvShareData.getData()[0]
//			  }
			});
		
		
		setTimeout(function()
		{
			$window.location.href = '/Four-Carry-and-One-Burden/Discussion Room.html';
		},3000); 

		

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
		
		console.log(data.userName)	
		
		if ( 
			(data.userName == 'necrodiver' && data.password == '123')	||
			(data.userName == 'pewpewbeam' && data.password == '123')
			)
		{	
			srvShareData.addData(data.userName);
			srvShareData.addData2(data.password);
		
			$window.location.href = '/Four-Carry-and-One-Burden/Z_Login/C2_Intranet.html';
		}
		else
		{
			$scope.alertMessage = " Wrong Information";
		}
	})
	.error(function (data, status, headers, config)
	{
		$scope[resultVarName] = "SUBMIT ERROR";
	});
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