var varMenu={
		inicio: function() {
			$("#enlaceCatalogo").click(varMenu.enviarCat);
			$("#enlaceUsuario").click(varMenu.enviarUser);
			$("#enlaceMuestra").click(varMenu.enviarMuestra);
			var $restriccion = $("#privilegios").text();
			if($restriccion==1){
				$("#enlaceUsuario").remove();
			}
		},
		
		enviarCat :function(){
			window.location="../controlador/controladorMenu.php?optMenu=vistaCatalogo";	
		},
		enviarUser : function() {
			window.location="../controlador/controladorMenu.php?optMenu=vistaUsuarios";
		},
		enviarMuestra : function() {
			window.location="../controlador/index.php";
		}

}
$(document).ready(varMenu.inicio);

