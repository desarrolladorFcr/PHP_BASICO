<?php
require_once '../modelo/ModeloBiblioteca.php';

$opt = $_REQUEST["opcion"];
$modelo = new ModeloBiblioteca();

if($opt == "mostrarTabla"){
	
	 $arrayLibros = $modelo->listaLibroYgenero();
	 echo json_encode($arrayLibros);
}

if($opt=="listaGen"){
	$arrayGenero = $modelo->generoEid();
	echo json_encode($arrayGenero);
}

if($opt=="actualizarReg"){
	$nombre= $_POST["nombre"];
	$descripcionLibro = $_POST["des"];
	$genero = $_POST["gen"];
	$idActualizar = $_POST["idActualizar"];
	$modelo->actualizarLibro($idActualizar, $genero, $descripcionLibro, $nombre);
}

if($opt=="crearReg"){
	$nombre=$_POST["nombre"];
	$descripcionLibro = $_POST["des"];
	$genero = $_POST["gen"];
	$modelo->crearLibro($nombre, $descripcionLibro, $genero);
}

if($opt=="elimReg"){
	$idEliminar = $_POST["isbnElim"];
	$modelo->eliminarLibro($idEliminar);
}

