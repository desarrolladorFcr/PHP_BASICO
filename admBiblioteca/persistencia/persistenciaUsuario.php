<?php
require_once '../dbConexion/ManejoDB.php';
class persistenciaUsuario extends ManejoDB
{
	public function listaUsuarios(){
		$sentTodoUsuario = "select * from empleado inner join privilegios on empleado.privi_id_privi = privilegios.id_privilegio";
		$res = parent::leer($sentTodoUsuario);
		return $res;
	}
	
	public function todoPrivilegios() {
		$sentPrivi= "select * from privilegios";
		$res = parent::leer($sentPrivi);
		return $res;
	}
	
	public function actUsuario($nombre,$apellido,$idPrivi,$clave,$idEmpleado) {
		$sentActUsuario = "UPDATE empleado 
				SET nombre = '$nombre', apellido= '$apellido' , privi_id_privi = '$idPrivi' ,credencial= '$clave' WHERE id_empleado=".$idEmpleado ;
		parent::crearActualizarEliminar($sentActUsuario);
	}
	
	public function elimUsuario ($idEliminar){
		$sentElim = "delete from empleado where id_empleado =". $idEliminar;
		parent::crearActualizarEliminar($sentElim);
	}
	
	public function crearUsuario ($idEmpleado,$nombre,$apellido,$privilegio,$psword){
		$sentCrear = "insert into empleado(id_empleado, nombre, apellido, privi_id_privi, credencial)values
		('$idEmpleado','$nombre','$apellido','$privilegio','$psword')";
		parent::crearActualizarEliminar($sentCrear);
	}
}