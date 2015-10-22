// JavaScript Document

function myFunction()
{
	var output = document.getElementById('canvas');
	
	var ele = document.createElement("div");
		ele.setAttribute("id","timedrpact");
		ele.setAttribute("class","drag");
		ele.setAttribute("style","width:20%");
		ele.innerHTML=document.getElementById('textbox1').value;
		output.appendChild(ele);
}