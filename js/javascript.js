// JavaScript Document

function myFunctionPostIT()
{
	var output = document.getElementById('canvas');
	
	var ele = document.createElement("div");
		ele.setAttribute("id","timedrpact");
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
	
	var ele = document.createElement("div");
		ele.setAttribute("id","timedrpact");
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
	
	var ele = document.createElement("div");
		ele.setAttribute("id","timedrpact");
		ele.setAttribute("class","drag");
		ele.setAttribute("style","width:20%");
		ele.style.border = "thick solid blue";
		ele.innerHTML=document.getElementById('textbox1').value;
		output.appendChild(ele);
}

function myFunctionPostITGreen()
{
	var output = document.getElementById('canvas');
	
	var ele = document.createElement("div");
		ele.setAttribute("id","timedrpact");
		ele.setAttribute("class","drag");
		ele.setAttribute("style","width:20%");
		ele.style.border = "thick solid green";
		ele.innerHTML=document.getElementById('textbox1').value;
		output.appendChild(ele);
}