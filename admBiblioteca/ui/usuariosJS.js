var url = "../controlador/controladorUsuarios.php";
var arrayPriv;
var $idPriv;
var $idActualizar;
var objUsuarios;
var usuario = new Object();
var funUsuario = {
	inicio: function() {
		$.get(url,"opcion=mostrarUs", function(resp){
			objUsuarios = JSON.parse(resp);
			funUsuario.tablaInicio(objUsuarios);
			$("#actuUsuario").click(funUsuario.actualizarUsu);
			$("#eliminarUsuario").click(funUsuario.eliminarUsu);
			$("#crearUsuario").click(funUsuario.crearUsu);
			$("#enviarForm").click(funUsuario.enviarAct);
			$("#enviarFormCrear").click(funUsuario.enviarCreacion);
//			botEnviar.click = funUsuario.enviarAct;
			$("#formulario").dialog({
				autoOpen: false,
				show: "blind",
				hide: "explode",
				modal: true,
			});
			$("#formCrear").dialog({
				autoOpen: false,
				show: "blind",
				hide: "explode",
				modal: true,
			})
		});
		$.post(url,"opcion=listaPriv", function(resp) {
			 arrayPriv = JSON.parse(resp);
		});
	},
	actualizarUsu: function() {
		var $radioIdEmpl = $("[name=selectIdEmpleado]");
		var idEm = funUsuario.saberIdEmpl($radioIdEmpl);
		if(idEm !== undefined){
			usuario = funUsuario.objSeleccionado(idEm);
			$("#formulario").dialog('open');
			var titulo = $("#Encabezado");
			titulo.text("Actualizar Usuario " + usuario.id_empleado);
			var select = $("#selPriv");
			$nombre = $("#nombre").val(usuario.nombre);
			$apellido = $("#apellido").val(usuario.apellido);
			$clave = $("#clave").val(usuario.credencial);
			
			for(var i = 0 ; i<arrayPriv.length; i++){
				select.append($("<option>",{
					value: arrayPriv[i].id_privilegio,
				}).text(arrayPriv[i].priv_descripcion)); 
			}
			
			var $selecc = $("#selPriv");
			$selecc.change(function() {
				$idPriv = $selecc.val();
			});
			
		}else{
			alert ("Debe seleccionar un usuario");
		}
		
	},
	enviarAct : function() {
		opcion = "actUsuario"
		$data = funUsuario.dataEnvio(opcion);
		$.post(url,$data,function (){
			window.location.reload(true);
		});
		
	},
	eliminarUsu : function() {
		var selElim = $("[name=selectIdEmpleado]");
		var idEliminar = funUsuario.saberIdEmpl(selElim);
		if(idEliminar !== undefined){
			var datos = "idEliminar=" + idEliminar + "&opcion=eliminarUsu"  
			$.post(url,datos, function() {
				window.location.reload(true);
			});
		}else{
			alert("Debe seleccionar a un empleado");
		}
	},
	crearUsu : function() {
		$("#formCrear").dialog("open");
		var titulo = $("#EncabezadoCrear");
		titulo.text("Crear Usuario");
		var sel = $("#selPrivCrear");
		for(var i = 0 ; i<arrayPriv.length; i++){
			sel.append($("<option>",{
				value: arrayPriv[i].id_privilegio,
			}).text(arrayPriv[i].priv_descripcion)); 
		}
		
		var $selecc = $("#selPrivCrear");
		$selecc.change(function() {
			$idPriv = $selecc.val();
		});
	},
	enviarCreacion : function() {
		var $clave1 = $("#claveCrear").val();
		var $clave2 = $("#OKclave").val();
		if($clave1 === $clave2){
			var dataEnvio = funUsuario.datosCreacion($clave2);
			$.post(url, dataEnvio, function() {
				window.location.reload(true);
			});
		}else{
			alert("las contraseñas no coinciden");
		}
	},
	tablaInicio: function(lista) {
		var listaUser = lista ;
		var $tbody = $("#tBody");
		for(var i = 0 ; i < listaUser.length; i++){
			var fila =$("<tr>");
    		var colIdEmpleado =$("<td>").text(listaUser[i].id_empleado);
    		var colNombre =$("<td>").text(listaUser[i].nombre);
    		var colApellido =$("<td>").text(listaUser[i].apellido);
    		var colpriv =$("<td>").text(listaUser[i].priv_descripcion);
    		var colSel = $("<th>");
    		var selRadio = $("<input>",{
    			name : "selectIdEmpleado",
    		    type : "radio",
    		    value: listaUser[i].id_empleado
    		});
    		colSel.append(selRadio);
    		fila.append(colIdEmpleado);
    		fila.append(colNombre);
    		fila.append(colApellido);
    		fila.append(colpriv);
    		fila.append(colSel);
    		$tbody.append(fila);
		}
		},
		saberIdEmpl : function(radioButton) {
			for (var i = 0 ; i< radioButton.length; i++){
				if(radioButton[i].checked){
					resp = radioButton[i].value;
					return resp;
				}
			}
		},
		dataEnvio : function(opcion) {
			$idPriv;
			$nombre = $("#nombre").val();
			$apellido = $("#apellido").val();
			$clave = $("#clave").val();
			
			return "idPrivilegio="+ encodeURIComponent($idPriv) + "&nombre="+encodeURIComponent($nombre) 
			+ "&apellido="+ encodeURIComponent($apellido) + "&idActualizar="+encodeURIComponent(usuario.id_empleado)
			+"&clave="+encodeURIComponent($clave)+ "&opcion="+encodeURIComponent(opcion)+ "&nocache="+ Math.random();
		},
		objSeleccionado : function(resp){
//			resp es igual al id del empleado seleccionado
			for(var j = 0 ; j < objUsuarios.length; j++){
				if(objUsuarios[j].id_empleado == resp){
					usuario.id_empleado = objUsuarios[j].id_empleado;
					usuario.nombre = objUsuarios[j].nombre;
					usuario.apellido = objUsuarios[j].apellido;
					usuario.privi_id_privi = objUsuarios[j].privi_id_privi;
					usuario.credencial = objUsuarios[j].credencial;
					usuario.id_privilegio = objUsuarios[j].id_privilegio;
					usuario.priv_descripcion = objUsuarios[j].priv_descripcion;
				}
			}
			return usuario;
		},
		datosCreacion : function($claveCorrecta) {
			$idPriv;
			$idUser = $("#idUser").val()
			$nombre = $("#nombreCrear").val();
			$apellido = $("#apellidoCrear").val();
			$clave = $claveCorrecta;
			return "idPrivilegio="+ encodeURIComponent($idPriv) + "&nombre="+encodeURIComponent($nombre) 
			+ "&apellido="+ encodeURIComponent($apellido) + "&idUser="+encodeURIComponent($idUser)
			+"&clave="+encodeURIComponent($clave)+ "&opcion="+encodeURIComponent("crearUsuario")+ "&nocache="+ Math.random();
		}
}

$(document).ready(funUsuario.inicio);