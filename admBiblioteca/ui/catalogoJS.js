var xHttp;
var idActualizar;
var listaGenero;
var $idGen;
var funcionesTabla ={
		preInicio : function() {
			funcionesTabla.enviarXMLHttp(funcionesTabla.obtenerArrayGen, "post", 
					"../controlador/controladorCatalogo.php", "opcion=listaGen");
		},
		inicio : function() {
			var tablaOpt = document.getElementById("tablaCUD");
			var credencial = document.getElementById("privilegios").textContent;
			var botonAct = document.getElementById("linkActualizar");
			var botonCrear= document.getElementById("linkCrear");
			var botonEliminar = document.getElementById("linkEliminar");
			var espacio = document.getElementById("content");
			var body = document.getElementsByTagName("body");
			botonAct.onclick=funcionesTabla.actualizarReg;
			botonCrear.onclick = funcionesTabla.crearReg;
			botonEliminar.onclick = funcionesTabla.eliminarReg;
			if(credencial==1){
				espacio.removeChild(tablaOpt);
			}
			funcionesTabla.enviarXMLHttp(funcionesTabla.mostrarTabla, "POST", 
					"../controlador/controladorCatalogo.php", "opcion=mostrarTabla");
	  },
		crearXMLHttp : function() {
			if(window.XMLHttpRequest){
				return new XMLHttpRequest();
			}else{
				if(window.ActiveXObject){
					return new ActiveXObject("Microsoft.XMLHTTP");
				}else{
					alert("Sin soporte para AJAX");
				}
			}
		},
		
		enviarXMLHttp: function(funcion,metodo,url,dato) {
			xHttp = funcionesTabla.crearXMLHttp();
			if(xHttp){
				xHttp.onreadystatechange=funcion;
			    xHttp.open(metodo,url,true);
			    xHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded" ) ;
			    xHttp.send(dato);
			}
		},
		
		mostrarTabla : function() {
			switch (xHttp.readyState){
			case 0||1||2||3:
				break;
			case 4:
				funcionesTabla.tablaLibros(xHttp.responseText);
				break;
			}
			
		},
		
		actualizarReg : function() {	
			var radioButton = document.getElementsByName("idLista");
			idActualizar = funcionesTabla.saberOpt(radioButton);
			if(idActualizar !== undefined){
//				funcionesTabla.formularioCatalogo("actualizar registro N°: "+ idActualizar, "enviarActu");
//				var botAct = document.getElementById("enviarActu");
//				botAct.onclick= funcionesTabla.enviarActu;
				var espacio = document.getElementById("content");
				var tablaLibros = document.getElementById("tablaCatalogo");
				var tablaLink = document.getElementById("tablaCUD");
				var selectGen = document.getElementById("optGenero");
				for(var i = 0; i<listaGenero.length;i++  ){
					var opt = document.createElement("option");
					opt.setAttribute("name","opcionesGen");
					opt.setAttribute("value",listaGenero[i].id_genero);
					var textOpt = document.createTextNode(listaGenero[i].descripcionGen);
					opt.appendChild(textOpt);
					selectGen.appendChild(opt);
				}
				var seleccion = document.getElementById("optGenero");
				selectGen.onchange= function() {
					$idGen = seleccion.value;
				}
				var enviarAct = document.getElementById("enviarForm");
				enviarAct.onclick=funcionesTabla.enviarActu;
				espacio.removeChild(tablaLibros);
				espacio.removeChild(tablaLink);
				var verFor = document.getElementById("formCatalogo");
				verFor.setAttribute("style", "display:inherit;");
				var titulo = document.getElementById("titulo");
				titulo.appendChild(document.createTextNode("Actualizar registro N°: " + idActualizar));
			}else{
				alert("Debe seleccionar un libro");
			}
		},
		
		obtenerArrayGen : function() {
			switch(xHttp.readyState){
			case 0||1||2||3:
				break;
			case 4:
				 listaGenero = JSON.parse(xHttp.responseText);
				 funcionesTabla.inicio();
				break;
			}
		},
		
		eliminarReg : function() {
			var radioButton = document.getElementsByName("idLista");
			var isbnEliminar = funcionesTabla.saberOpt(radioButton);
			if(isbnEliminar !== undefined){
				funcionesTabla.enviarXMLHttp(funcionesTabla.tablaComienzo, "post", "../controlador/controladorCatalogo.php", "isbnElim="+isbnEliminar+"&opcion=elimReg");
			}else{
				alert("Debe seleccionar un libro");
			}
		},
		
		tablaComienzo : function() {
			switch (xHttp.readyState) {
			case 0||1||2||3:
				break;
			case 4:
				window.location = "../controlador/controladorMenu.php?optMenu=vistaCatalogo";
				break;
			}
			
		},
		
		crearReg : function() {
//			funcionesTabla.formularioCatalogo("Ingresar nuevo libro", "nuevoLibro");
//			var boton = document.getElementById("nuevoLibro");
//			var textArea = document.getElementById("desc");
//			boton.onclick = funcionesTabla.enviarNuevo;
			var espacio = document.getElementById("content");
			var tablaLibros = document.getElementById("tablaCatalogo");
			var tablaLink = document.getElementById("tablaCUD");
			var selectGen = document.getElementById("optGenero");
			for(var i = 0; i<listaGenero.length;i++  ){
				var opt = document.createElement("option");
				opt.setAttribute("name","opcionesGen");
				opt.setAttribute("value",listaGenero[i].id_genero);
				var textOpt = document.createTextNode(listaGenero[i].descripcionGen);
				opt.appendChild(textOpt);
				selectGen.appendChild(opt);
			}
			var seleccion = document.getElementById("optGenero");
			selectGen.onchange= function() {
				$idGen = seleccion.value;
			}
			var enviarCrear = document.getElementById("enviarForm");
			enviarCrear.onclick=funcionesTabla.enviarNuevo;
			espacio.removeChild(tablaLibros);
			espacio.removeChild(tablaLink);
			var verFor = document.getElementById("formCatalogo");
			verFor.setAttribute("style", "display:inherit;");
			var titulo = document.getElementById("titulo");
			titulo.appendChild(document.createTextNode("Crear nuevo registro"));
		},
		
		enviarNuevo: function() {
			var optNuevo = "crearReg";
			var data = funcionesTabla.datosActu(optNuevo);
			funcionesTabla.enviarXMLHttp(funcionesTabla.tablaComienzo, "post", "../controlador/controladorCatalogo.php", data);
		},
		
		enviarActu : function() {
				var optActualizar = "actualizarReg";
				var data = funcionesTabla.datosActu(optActualizar);
				funcionesTabla.enviarXMLHttp(funcionesTabla.tablaComienzo, "post", "../controlador/controladorCatalogo.php", data);
		},
		
		tablaLibros : function(lista) {
			var listaBiblo = JSON.parse(lista);
			var tBody = document.getElementById("tbody");
			for(var i=0; i<listaBiblo.length;i++ ){
				var botRadio = document.createElement("input");
				botRadio.setAttribute("type","radio");
				botRadio.setAttribute("name","idLista");
				botRadio.setAttribute("value",listaBiblo[i].isbn);
				tBody.insertRow(i);
				tBody.rows[i].insertCell(0);
				tBody.rows[i].insertCell(1);
				tBody.rows[i].insertCell(2);
				tBody.rows[i].insertCell(3);
				tBody.rows[i].insertCell(4);
				tBody.rows[i].cells[0].appendChild(document.createTextNode(listaBiblo[i].isbn));
				tBody.rows[i].cells[1].appendChild(document.createTextNode(listaBiblo[i].titulo));
				tBody.rows[i].cells[2].appendChild(document.createTextNode(listaBiblo[i].descripcionLib));
				tBody.rows[i].cells[3].appendChild(document.createTextNode(listaBiblo[i].descripcionGen));
				tBody.rows[i].cells[4].appendChild(botRadio);
			}
		},
		
		 saberOpt: function (itemOpt){
			for(var i = 0; i < itemOpt.length; i++){
				if(itemOpt[i].checked){
					var resp = itemOpt[i].value;
					return resp;
				}
			}
		},
		
		//Se remplaza este formulario por uno en HTLM 
		
//		formularioCatalogo : function(titulo, nombreBoton) {
//			var espacio = document.getElementById("content");
//			var tablaLibros = document.getElementById("tablaCatalogo");
//			var tablaOpt = document.getElementById("tablaCUD");
//			espacio.removeChild(tablaLibros);
//			espacio.removeChild(tablaOpt);
//			var form = document.createElement("form");
//			var titulo = document.createElement("legend").appendChild(document.createTextNode(titulo));
//			var p =  document.createElement("p");
//			p.appendChild(titulo);
//			var p1 = document.createElement("p");
//			var p2 = document.createElement("p");
//			var p3 = document.createElement("p");
//			var p4 = document.createElement("p");
//			var campNombre = document.createElement("input");
//			campNombre.setAttribute("id","nombreLibro");
//			campNombre.setAttribute("placeholder","Nombre Libro");
//			var campDescripcion = document.createElement("textarea");
//			campDescripcion.setAttribute("placeholder","Descripción Libro");
//			campDescripcion.setAttribute("id","desc");
//			var optGenero = document.createElement("input");
////			var optGen = document.createElement("option").appendChild(document.createTextNode("Genero"));
//			optGenero.setAttribute("id","optGenero");
////			optGenero.appendChild(optGen);
//			var boton = document.createElement("a");
//			boton.setAttribute("href","#");
//			boton.setAttribute("id", nombreBoton);
//			boton.appendChild(document.createTextNode("Enviar"));
//			p1.appendChild(campNombre);
//			p2.appendChild(campDescripcion);
//			p3.appendChild(optGenero);
//			p4.appendChild(boton);
//			form.appendChild(p);
//			form.appendChild(p1);
//			form.appendChild(p2);
//			form.appendChild(p3);
//			form.appendChild(p4);
//			espacio.appendChild(form);
//		}	,
		datosActu: function(opt) {
			nombreLibro = encodeURIComponent(document.getElementById("nombreLibro").value);
			descripcion = encodeURIComponent(document.getElementById("desc").value);
			gen = encodeURIComponent($idGen);
			opt = encodeURIComponent(opt);
			return "opcion="+opt +"&des="+descripcion+"&nombre="+nombreLibro+"&gen="+gen+"&idActualizar="+idActualizar +"&nocache="+Math.random();
		}
		
}

window.onload=funcionesTabla.preInicio;