	function $(id)
	{
		return document.getElementById(id);
	}

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
		
		// Single Click
		if(clickCount === 1) 
		{
			debug.addEventListener('mousemove', mouseMove);
		
			singleClickTimer = setTimeout(function() 
			{
//			console.log('single click');
			clickCount = 0;
			}, 400);
		
		// Double Click
		} else if (clickCount === 2) 
		{
//			console.log('double click');
			
			var $j = jQuery.noConflict();
			$j(function() 
			{
//			  $j("#close-gallery-nav-button").click(function() {
			  $j('div').on('dblclick', function(){
//				$j('#gallery-nav-button').addClass('animated fadeOutRightBig');
				
//				console.log('double click inside');
				
				var $k = jQuery.noConflict();
				
					$k('#expandedPOSIT').modal('show');
			
				});
				
				
				var $l = jQuery.noConflict();
				$l('#debug').on('dblclick', 'div', function(e){
//				$j('#gallery-nav-button').addClass('animated fadeOutRightBig');
				
//				console.log(e.target.id);
			
//				console.log(document.getElementById('necro').innerHTML);
				
				document.getElementById("necrodiver").innerHTML = document.getElementById(e.target.id).innerHTML;
				document.getElementById("necrodiver2").innerHTML = document.getElementById(e.target.id).innerHTML;
			
				});
				
				
				
				
//				$('#the_div').on('dblclick', 'div', function(e) 
//				{
//    				console.log(e.target);
//				});
				
				
				
			
			});
			
			clear();
		}
	}, false);

	window.addEventListener('mouseup', function() 
	{
		debug.removeEventListener('mousemove', mouseMove);
	});

