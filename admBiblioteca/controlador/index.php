<?php
require_once '../logicaVista/LogicaVista.php';

$logVista = new LogicaVista();
$doc = file_get_contents("../ui/plantilla.html");
$diccionario = array(
		"bibliotecaJQueryUI" => "",
		"estiloJQueryUI" => "",
		"contenidoCentral" => file_get_contents("../ui/formValidacion.html"),
		"cabecera" => "Bienvenido al sistema de ingreso de la Biblioteca Central",
		"src"=> "src = '../ui/logueoJS.js' "
);

$html = $logVista->sustituirContenido($doc, $diccionario);
