<?php
require_once '../logicaVista/LogicaVista.php';
require_once '../modelo/ModeloBiblioteca.php';

session_start();

$modelo = new ModeloBiblioteca();
$logVista = new LogicaVista();

$user = $_POST['user'];
$psw = $_POST['psw'];

$arrayUser = $modelo->confirmUsuario($user, $psw);

if(array_key_exists("error", $arrayUser)){
	echo $arrayUser["error"];
}else{
	$_SESSION["nombre"]=$arrayUser[0]["nombre"];
	$_SESSION["apellido"]=$arrayUser[0]["apellido"];
	$_SESSION["privilegio"]= $arrayUser[0]["privi_id_privi"];
	$_SESSION["id_empleado"] = $arrayUser[0]["id_empleado"];
	$_SESSION["clave"]=$arrayUser[0]["credencial"];
	echo "permitido";
	exit();
}