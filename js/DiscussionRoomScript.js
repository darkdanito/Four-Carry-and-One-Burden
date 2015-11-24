// JavaScript Document

var testUserName;
var testRoomName;
var onUpdateColor;
var onUpdate;
var onDelete;

var app = angular.module('mainModule', [], function () 			//	Main Controller for the Web Application
{
})

app.controller("mainController", function ($scope, $http, $window, srvShareData)
{	
	if (srvShareData.getData().length == 0)
	{
		$scope.loggingUserName = 'Yuuki Asuna [Never Login]';	
		$scope.loggingUserPassword = 'Yuuki Asuna password [Never Login]';	
		testUserName = 'Yuuki Asuna [Never Login]';
	}
	else
	{
		$scope.loggingUserName = srvShareData.getData()[0];	
		$scope.roomName = srvShareData.getData2()[0];	

		testUserName = srvShareData.getData()[0];
		testRoomName = srvShareData.getData2()[0];
	}	
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


		setTimeout(function()
		{
			var username;
	
			var buttonSendMessage = document.getElementById('sendMessage');
			var buttonSendMessage2 = document.getElementById('sendMessage2');
			var buttonSendMessage3 = document.getElementById('sendMessage3');
			var buttonSendMessage4 = document.getElementById('sendMessage4');
			
			var textMessage = document.getElementById('textbox1');
		
			var myFirebase2 = new Firebase("https://c4posit.firebaseIO.com/").child("user");
			var myFirebase6 = new Firebase("https://c4posit.firebaseIO.com/").child("roomDetails");		
			var myFirebase3 = new Firebase("https://c4posit.firebaseIO.com/").child("chat2");
			var myFirebase5 = new Firebase("https://c4posit.firebaseIO.com/").child(testRoomName);	

			/****************************************************************************
			*	Function for the Update of the Host Name and Room Password Box			*
			*****************************************************************************/		
			var getterString;
			var getter;
			new Firebase('https://c4posit.firebaseIO.com/roomDetails').child(testRoomName).once('value', function(snap) 
			{
				getterString = JSON.stringify( snap.val(), null, 2);
				getter = snap.val();
	
				document.getElementById('hostName').innerHTML = "Host Name: "+getter.roomCreator;
				
				if(testUserName == getter.roomCreator)
				{
					document.getElementById('hostPassword').innerHTML = "Host Password: "+getter.password;
				}
			});

//			myFirebase6.update(
//			{
//			  someroom5: 
//			  {
//				roomName: "Meatshield",
//				password: "asd123!",
//				roomCreator: "nothing"
//			  }
//			});		
	
			var usernameInput = testUserName;
			username = usernameInput;
		
			// Update the firebase to the correct DB
			var actualRoom = myFirebase5;
		
			/****************************************************************************
			*	Firebase Function for adding of child elements							*
			*****************************************************************************/	
			actualRoom.on('child_added', function(snapshot) 
			{
				var key = snapshot.key();
				var msg = snapshot.val();
				
				var x = getOffset( document.getElementById('canvas') ).top; 
				var y = getOffset( document.getElementById('canvas') ).left; 
	
				var html = '<div id = "'+key+'" class="drag" style= "width: 20% ; border: '+msg.color+'; left : '+msg.XPos+' ; top : '+msg.YPos+'">' +
							msg.message 
							'</div>';
				document.querySelector("#canvas").innerHTML += html;
			});
	
			/****************************************************************************
			*	Firebase Function for Updating the child element when changed			*
			*****************************************************************************/			
			actualRoom.on('child_changed', function(snapshot) 
			{
				var key = snapshot.key();
				var msg = snapshot.val();
				var html = msg.message;
				var chatComponent = document.querySelector("#"+key);
				
				chatComponent.className = "drag";
				chatComponent.innerHTML = html;
				
				chatComponent.style.left = msg.XPos;
				chatComponent.style.top = msg.YPos;
				chatComponent.style.border = msg.color;
			});
			
			/****************************************************************************
			*	Firebase Function for Removal of child elements							*
			*****************************************************************************/	
			actualRoom.on('child_removed', function(snapshot) 
			{
				var key = snapshot.key();
				var msg = snapshot.val();
				var html = "Message has been deleted";
				
				document.querySelector("#"+key).innerHTML = html;
				document.querySelector("#"+key).remove();
			});
			
			
			buttonSendMessage.addEventListener("click", function() 
			{
				var message = textMessage.value;
			
				username = username.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				message = message.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				
				var dbXPos = getOffset( document.getElementById('canvas') ).top; 
				var dbYPos = getOffset( document.getElementById('canvas') ).left; 
				
				var color = "thick solid black";
				
				actualRoom.push({author:username, message:message, color:color, XPos: dbXPos, YPos:dbYPos });
		
				textMessage.value = "Please input your ideas here";
			});
			
			buttonSendMessage2.addEventListener("click", function() 
			{
				var message = textMessage.value;
			
				username = username.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				message = message.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				
				var dbXPos = getOffset( document.getElementById('canvas') ).top; 
				var dbYPos = getOffset( document.getElementById('canvas') ).left; 
				
				var color = "thick solid red";
				
				actualRoom.push({author:username, message:message, color : color, XPos: dbXPos, YPos:dbYPos });
				textMessage.value = "Please input your ideas here";
			});
			
			buttonSendMessage3.addEventListener("click", function() 
			{
				var message = textMessage.value;
			
				username = username.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				message = message.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				
				var dbXPos = getOffset( document.getElementById('canvas') ).top; 
				var dbYPos = getOffset( document.getElementById('canvas') ).left; 
				
				var color = "thick solid blue";
				
				actualRoom.push({author:username, message:message, color : color, XPos: dbXPos, YPos:dbYPos });
				textMessage.value = "Please input your ideas here";
			});
			
			buttonSendMessage4.addEventListener("click", function() 
			{
				var message = textMessage.value;
			
				username = username.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				message = message.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
				
				var dbXPos = getOffset( document.getElementById('canvas') ).top; 
				var dbYPos = getOffset( document.getElementById('canvas') ).left; 
				
				var color = "thick solid green";
				
				actualRoom.push({author:username, message:message, color : color, XPos: dbXPos, YPos:dbYPos });
				textMessage.value = "Please input your ideas here";
			});
		
			//////////////////////////////////////////////////////////////////////////////
			//////////////////				Mouse Click Codes 		 	//////////////////
			//////////////////////////////////////////////////////////////////////////////				
			function $(id)
			{
				return document.getElementById(id);
			}
			
			var _startX = 0;					// mouse starting positions
			var _startY = 0;
			var _offsetX = 0;					// current element offset
			var _offsetY = 0;
			var _dragElement;					// needs to be passed from OnMouseDown to OnMouseMove
			var _oldZIndex = 0;					// we temporarily increase the z-index during drag
			var _debug = $('debug');			// makes life easier
			var divName;
			
			InitDragDrop();
			
			function InitDragDrop()
			{
				document.onmousedown = OnMouseDown;
				document.onmouseup = OnMouseUp;
			}
			
			function OnMouseDown(e)
			{
				// IE is retarded and doesn't pass the event object
				if (e == null) 
					e = window.event; 
				
				// IE uses srcElement, others use target
				var target = e.target != null ? e.target : e.srcElement;
			
				// for IE, left click == 1
				// for Firefox, left click == 0
				if ((e.button == 1 && window.event != null || 
					e.button == 0) && 
					target.className == 'drag')
				{
					// grab the mouse position
					_startX = e.clientX;
					_startY = e.clientY;
					
					// grab the clicked element's position
					_offsetX = ExtractNumber(target.style.left);
					_offsetY = ExtractNumber(target.style.top);
					
					// bring the clicked element to the front while it is being dragged
					_oldZIndex = target.style.zIndex;
					target.style.zIndex = 10000;
					
					// we need to access the element in OnMouseMove
					_dragElement = target;
			
					// tell our code to start moving the element with the mouse
					document.onmousemove = OnMouseMove;
					
					// cancel out any text selections
					document.body.focus();
					
					// prevent text selection in IE
					document.onselectstart = function () { return false; };
					// prevent IE from trying to drag an image
					target.ondragstart = function() { return false; };
					
					// prevent text selection (except IE)
					return false;
				}
			}
			
			function ExtractNumber(value)
			{
				var n = parseInt(value);
				
				return n == null || isNaN(n) ? 0 : n;
			}
			
			function OnMouseMove(e)
			{
				if (e == null) 
					var e = window.event; 
			
				// this is the actual "drag code"
				_dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
				_dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
				
				divName = e.target.id;
		
				if (divName != 'canvas' && divName != 'textbox1')
				{
					var getXPos = _dragElement.style.left;
					var getYPos = _dragElement.style.top;
		//          _debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';	
		
					actualRoom.child(divName).update({ XPos: getXPos, YPos: getYPos });
				}
			}
			
			function OnMouseUp(e)
			{
				if (_dragElement != null)
				{
					_dragElement.style.zIndex = _oldZIndex;
			
					// we're done with these events until the next OnMouseDown
					document.onmousemove = null;
					document.onselectstart = null;
					_dragElement.ondragstart = null;
			
					// this is how we know we're not dragging
					_dragElement = null;
					
		//				_debug.innerHTML = 'mouse up';
				}
			}
			
	
			/****************************************************************************
			*	Function mouse Movement													*
			*****************************************************************************/	
			function $(id)
			{
				return document.getElementById(id);
			}
		
			var globalDivID = '';
			var clickCount = 0,
			
			mouseMove   = function(e) 
			{
		//		console.log('drag click');
				debug.removeEventListener('mousemove', mouseMove);
				clear();
				
				_startX = e.clientX;
				_startY = e.clientY;
				
				// grab the clicked element's position
				_offsetX = ExtractNumber(target.style.left);
				_offsetY = ExtractNumber(target.style.top);
				
				// bring the clicked element to the front while it is being dragged
				_oldZIndex = target.style.zIndex;
				target.style.zIndex = 10000;
				
				// we need to access the element in OnMouseMove
				_dragElement = target;
				
				// tell our code to start moving the element with the mouse
				document.onmousemove = OnMouseMove;
				
				// cancel out any text selections
				document.body.focus();
				
				// prevent text selection in IE
				document.onselectstart = function () { return false; };
				// prevent IE from trying to drag an image
				target.ondragstart = function() { return false; };
				
				// prevent text selection (except IE)
				return false;
			},
			
			clear = function() 
			{
				clickCount = 0;
				clearTimeout(singleClickTimer);
			},
			
			singleClickTimer;
			
			debug.addEventListener('mousedown', function() 
			{
				clickCount++;
				
		// 		Single Click
				if(clickCount === 1) 
				{
		////		debug.addEventListener('mousemove', mouseMove);
				
					singleClickTimer = setTimeout(function() 
					{
		//			console.log('single click');
					clickCount = 0;
					}, 400);
				
		// 		Double Click
				} else if (clickCount === 2) 
				{
					var $j = jQuery.noConflict();
					$j(function() 
					{
					  $j('div').on('dblclick', function()
					  {
						var $k = jQuery.noConflict();
							$k('#expandedPOSIT').modal('show');
						});
						
						
						var $l = jQuery.noConflict();
						$l('#debug').on('dblclick', 'div', function(e)
						{					
							document.getElementById("necrodiver").innerHTML = document.getElementById(e.target.id).innerHTML;
							document.getElementById("necrodiver2").innerHTML = document.getElementById(e.target.id).innerHTML;
							document.getElementById("editPostContent").innerHTML = document.getElementById(e.target.id).innerHTML;
							document.getElementById("editColorContent").innerHTML = document.getElementById(e.target.id).innerHTML;
										
							globalDivID = document.getElementById(e.target.id).id;
						});
		
					});
					
					clear();
				}
			}, false);

			window.addEventListener('mouseup', function() 
			{
		//		debug.removeEventListener('mousemove', mouseMove);
			});
		
			/****************************************************************************
			*	Function for the Removal of POSIT										*
			*****************************************************************************/	
			onDelete = function onDelete()
			{
				actualRoom.child(globalDivID).remove();
			}
			
			/****************************************************************************
			*	Function for the edit of POSIT contents									*
			*****************************************************************************/	
			onUpdate = function onUpdate()
			{
				var newMessage = document.getElementById('editPostContent').value;
				actualRoom.child(globalDivID).update({ message: newMessage });
			}
			
			/****************************************************************************
			*	Function for update of POSIT color										*
			*****************************************************************************/	
			onUpdateColor = function onUpdateColor(color)
			{
				var newColor = color;
				actualRoom.child(globalDivID).update({ color: newColor });	
			}
			
			/****************************************************************************
			*	Function for the offset of Div X and Y for Dynamic Insert of DIV		*
			*****************************************************************************/	
			function getOffset(el) 
			{
				var _x = 0;
				var _y = 0;
				
				while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) 
				{
					_x += el.offsetLeft - el.scrollLeft;
					_y += el.offsetTop - el.scrollTop;
					el = el.offsetParent;
				}
				
				return { top: _y, left: _x };
			}
		

		},1000); 