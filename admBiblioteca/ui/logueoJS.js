var xmlHttp;

var inicioLogueo = {
		
		inicioEnvio: function() {
			var botInicio = document.getElementById("bIngresar");
			botInicio.onclick=inicioLogueo.enviarIngreso;
			var linkWS = document.getElementById("linkWebService");
			linkWS.onclick = function() {
				window.location = "../controlador/controladorWebS.php"
			} 
		},
		
		enviarSolicitud: function(metodo,url,dato,funcion) {
			xmlHtpp =  inicioLogueo.objXMLHttpRequest();
			if(xmlHtpp){
				xmlHtpp.onreadystatechange=funcion;
				xmlHtpp.open(metodo,url,true);
				xmlHtpp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded" ) ;
				xmlHtpp.send(dato); 
			}
		},	
		
	 objXMLHttpRequest: function() {
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else{
			if(window.ActiveXObject){
				return new ActiveXObject("Microsoft.XMLHTTP");
			}else{
				alert ("Sin soporte para AJAX");
			}
		}
	},
	
	enviarIngreso: function(){
		var valiUser = validarUsuario();
		var valiClave = validarClave();
		if(valiUser == true){
			if(valiClave == true){
				data = inicioLogueo.datosLogueo();
				inicioLogueo.enviarSolicitud('POST', "../controlador/controladorInicio.php", data, inicioLogueo.respuestaLogueo)
			}else{
				alert(valiClave);
			}	
		}else{
			alert(valiUser);
		}
	},
	
	respuestaLogueo : function(){
		var letrero = document.getElementById("mensError");
		switch(xmlHtpp.readyState){
		case 0 ||1 ||2 ||3 :
			break;
		case 4 :
			var labelAlerta = document.getElementById("mensError");
			labelAlerta.innerHTML="  ";
			var res = xmlHtpp.responseText;
			var alerta = document.createTextNode(res);
			if(res == "permitido"){
				window.location = "../controlador/controladorMenu.php?optMenu=vistaMenu";
			}else{
				labelAlerta.appendChild(alerta);
            	labelAlerta.style.color="#008000";
	            labelAlerta.style.color="#ff0000";
			}
			
			}
	},
	
	datosLogueo : function() {
		var $user =document.getElementById("user").value;
		var $pss  =document.getElementById("contrasena").value;
		return "user="+ encodeURIComponent($user)+"&psw="+encodeURIComponent($pss)+"&noCache="+Math.random();
	}
}

window.onload = inicioLogueo.inicioEnvio;
