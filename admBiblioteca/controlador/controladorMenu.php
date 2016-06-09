<?php

require_once '../logicaVista/LogicaVista.php';

session_start();

	$optMenu= $_GET["optMenu"];
	$logicaVista = new LogicaVista();
	$doc = file_get_contents("../ui/plantilla.html");
	
	if($optMenu=="vistaMenu"){
		$diccionario = array(
				"bibliotecaJQueryUI" => "",
				"estiloJQueryUI" => "",
				"contenidoCentral" => file_get_contents("../ui/menuSitio.html"),
				"cabecera" => "Usuario: " . $_SESSION["nombre"]."  ".$_SESSION["apellido"],
				"src"=> "src = '../ui/menuJS.js' ",
				"privilegio" => $_SESSION["privilegio"]
		);
		
		$logicaVista->sustituirContenido($doc, $diccionario);
		
	}
	
	if($optMenu=="vistaCatalogo"){
		$dicCatalogo= array(
				"bibliotecaJQueryUI" => "",
				"estiloJQueryUI" => "",
				"contenidoCentral" => file_get_contents("../ui/tablaCatalogo.html"),
				"cabecera" => "Usuario: ". $_SESSION["nombre"]." ". $_SESSION["apellido"],
				"src"=> "src = '../ui/catalogoJS.js' ",
				"privilegio" => $_SESSION["privilegio"]
		);
		$logicaVista->sustituirContenido($doc, $dicCatalogo);
	}
	
	if($optMenu=="vistaUsuarios"){
		$dicUsuario=array(
				"bibliotecaJQueryUI" => "src='../jqueryYcss/jquery-ui-1.11.4.custom/jquery-ui.min.js'",
				"estiloJQueryUI" => "href='../jqueryYcss/jquery-ui-1.11.4.custom/jquery-ui.css'",
				"contenidoCentral" => file_get_contents("../ui/tablaUsuarios.html"),
				"cabecera" => "Usuario: ". $_SESSION["nombre"]." ". $_SESSION["apellido"],
				"src"=> "src = '../ui/usuariosJS.js' ",
				"privilegios" => $_SESSION["privilegio"]
		);
		$logicaVista->sustituirContenido($doc, $dicUsuario);
	}

