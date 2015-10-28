	function myFunctionPostIT()
	{
		var output = document.getElementById('canvas');
	
		var uniqid = Date.now();
	
		var ele = document.createElement("div");
			ele.setAttribute("id",uniqid);
			ele.setAttribute("class","drag");
			ele.setAttribute("style","width:20%");
	//		ele.style.backgroundColor = "green";
			ele.style.border = "thick solid black";
			ele.innerHTML=document.getElementById('textbox1').value;
			output.appendChild(ele);
	}
	
	function myFunctionPostITRed()
	{
		var output = document.getElementById('canvas');
		
		var uniqid = Date.now();
		
		var ele = document.createElement("div");
			ele.setAttribute("id",uniqid);
			ele.setAttribute("class","drag");
			ele.setAttribute("style","width:20%");
	//		ele.style.backgroundColor = "red";
	//		ele.style.borderColor = "red";
			ele.style.border = "thick solid red";
			ele.innerHTML=document.getElementById('textbox1').value;
			output.appendChild(ele);
	}
	
	function myFunctionPostITBlue()
	{
		var output = document.getElementById('canvas');
		
		var uniqid = Date.now();
		
		var ele = document.createElement("div");
			ele.setAttribute("id",uniqid);
			ele.setAttribute("class","drag");
			ele.setAttribute("style","width:20%");
			ele.style.border = "thick solid blue";
			ele.innerHTML=document.getElementById('textbox1').value;
			output.appendChild(ele);
	}
	
	function myFunctionPostITGreen()
	{
		var output = document.getElementById('canvas');
	
		var uniqid = Date.now();
		
		var ele = document.createElement("div");
			ele.setAttribute("id",uniqid);
			ele.setAttribute("class","drag");
			ele.setAttribute("style","width:20%");
			ele.style.border = "thick solid green";
			ele.innerHTML=document.getElementById('textbox1').value;
			output.appendChild(ele);
	}
	
	function $(id)
	{
		return document.getElementById(id);
	}

	var globalDivID = '';
	var clickCount     = 0,
	
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
			debug.addEventListener('mousemove', mouseMove);
		
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
		debug.removeEventListener('mousemove', mouseMove);
	});


	function onDelete()
	{
		var $q = jQuery.noConflict();
		$q('#' + globalDivID).closest("div").remove();
	}
	
	function onUpdate()
	{
		console.log(globalDivID);

		document.getElementById(globalDivID).innerHTML = document.getElementById('editPostContent').value;
	}
	
	function onUpdateColor1()
	{
		var $xx = jQuery.noConflict();	
		$xx("#" + globalDivID).css("border", "thick solid black");
	}
	
		function onUpdateColor2()
	{
		var $xx = jQuery.noConflict();
		$xx("#" + globalDivID).css("border", "thick solid red");
	}
	
	function onUpdateColor3()
	{
		var $xx = jQuery.noConflict();	
		$xx("#" + globalDivID).css("border", "thick solid blue");
	}
	
	function onUpdateColor4()
	{
		var $xx = jQuery.noConflict();
		$xx("#" + globalDivID).css("border", "thick solid green");
	}