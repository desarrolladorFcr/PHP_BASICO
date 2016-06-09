<?php
require_once '../persistencia/persistenciaUsuario.php';

class ModeloUsuario
{
	private $persistenciaUser;
	
	public function __construct() {
		$this->persistenciaUser = new persistenciaUsuario();
	}
	
	public function listaUsuarios() {
		$res = $this->persistenciaUser->listaUsuarios();
		return $res->fetchAll(PDO::FETCH_ASSOC);
	}
	
	public function listaPrivilegios() {
		$res = $this->persistenciaUser->todoPrivilegios();
		return $res-> fetchAll(PDO::FETCH_ASSOC);
	}
	
	public function actUsuario($nombre,$apellido,$idPrivi,$clave,$idEmpleado){
		$this->persistenciaUser->actUsuario($nombre, $apellido, $idPrivi, $clave, $idEmpleado);
	}
	
	public function elimUsuario ($idEliminar){
		$this->persistenciaUser->elimUsuario($idEliminar);
	}
	
	public function crearUsuario ($idEmpleado,$nombre,$apellido,$privilegio,$psword){
		$this->persistenciaUser->crearUsuario($idEmpleado, $nombre, $apellido, $privilegio, $psword);
	}
}