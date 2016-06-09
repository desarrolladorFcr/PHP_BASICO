  function validarUsuario() {
	 var usuario = document.getElementById("user").value;
	 var numUsuario = usuario.length;
	if(numUsuario==0){
		return "Campo usuario no puede estar vacío";
	}else{
		if(isNaN(usuario)){
			return "Debe ingresar un usuario valido"; 
		}else{
			return true;
		}
	}
}
 
 function validarClave() {
	var clave = document.getElementById("contrasena").value;
	var numClave = clave.length;
	if(numClave==0){
		return "Campo clave no puede estar vacío";
	}else{
		return true;
	}
}