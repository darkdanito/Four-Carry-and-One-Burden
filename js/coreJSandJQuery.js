	function myFunctionPostIT(color)
	{
		var output = document.getElementById('canvas');
	
		var uniqid = Date.now();
	
		var ele = document.createElement("div");
			ele.setAttribute("id",uniqid);
			ele.setAttribute("class","drag");
			ele.setAttribute("style","width:20%");
			ele.style.border = color;
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
	
	function onUpdateColor(color)
	{
		var $xx = jQuery.noConflict();	
		$xx("#" + globalDivID).css("border", color);
	}