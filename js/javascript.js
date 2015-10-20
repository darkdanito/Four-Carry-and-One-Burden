// JavaScript Document

function myFunction()
{
	var output = document.getElementById('pageContainer');
	
	var ele = document.createElement("div");
		ele.setAttribute("id","timedrpact");
		ele.setAttribute("class","drag");
		ele.setAttribute("style","width:20%");
		ele.innerHTML=document.getElementById('textbox1').value;
		output.appendChild(ele);
}


/*window.onload=function(){
    var output = document.getElementById('pageContainer');
    var i=1;
    var val="";
    while(i<=2)
    {

        if(!document.getElementById('timedrpact'+i))
        {
            var ele = document.createElement("div");
            ele.setAttribute("id","timedrpact"+i);
            ele.setAttribute("class","drag");
            ele.innerHTML="hi "+i;
            output.appendChild(ele);
            
        }
        i++;
        

    }
};*/