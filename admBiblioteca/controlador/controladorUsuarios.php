<?php
require_once '../modelo/ModeloUsuario.php';
$opt = $_REQUEST["opcion"];
$modUsuario = new ModeloUsuario();

if($opt=="mostrarUs"){
	$listaUsu = $modUsuario->listaUsuarios();
	echo json_encode($listaUsu);
	
}

if($opt == "listaPriv"){
	$listaPriv = $modUsuario->listaPrivilegios();
	echo json_encode($listaPriv);
}

if($opt=="actUsuario"){
	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$idPrivi = $_POST["idPrivilegio"];
	$clave = $_POST["clave"];
	$idEmpleado = $_POST["idActualizar"];
	$modUsuario->actUsuario($nombre, $apellido, $idPrivi, $clave, $idEmpleado);
}

if($opt == "eliminarUsu"){
	$idEliminar = $_POST["idEliminar"];
	$modUsuario->elimUsuario($idEliminar);
}

if($opt == "crearUsuario"){
	$nombre = $_POST["nombre"];
	$apellido = $_POST["apellido"];
	$idPrivi = $_POST["idPrivilegio"];
	$clave = $_POST["clave"];
	$idEmpleado = $_POST["idUser"];
	$modUsuario->crearUsuario($idEmpleado, $nombre, $apellido, $idPrivi, $clave);
}