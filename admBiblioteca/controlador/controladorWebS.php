<?php
require_once '../modelo/ModeloBiblioteca.php';
require_once '../lib/nusoap.php';
// $opt = $_REQUEST['opcion'];

function listaLibros(){
// 	$mod = new ModeloBiblioteca();
// 	$resp = $mod->listaLibroYgenero();
$resp= "ewfwe";
	return $resp;
}

	if(!isset($HTTP_RAW_POST_DATA)){
		$HTTP_RAW_POST_DATA = file_get_contents('php://input');
	}
	$servidor = new soap_server();
	$servidor->configureWSDL("Web service Biblioteca Central", "urn:infLIbros");
	$servidor->register("listaLibros",
			array(),//parámetro
 		array('return'=>'xsd:string'),//respuesta
 		'urn:infLIbros',//nameespace
 		'urn:infLIbros#listaLibros',//accion
 		'rpc',//estilo
 		'encoded',
 		'Muestra libros de la colección de la Biblioteca Central');
	$servidor->service($HTTP_RAW_POST_DATA);



