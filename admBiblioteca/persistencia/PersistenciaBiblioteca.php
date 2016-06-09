<?php
require_once '../dbConexion/ManejoDB.php';

class PersistenciaBiblioteca extends ManejoDB
{
	public function generoEid(){
		$sentGenero = "select descripcionGen, id_genero from genero";
		$res = parent::leer($sentGenero);
		return $res;
	}
	
	public function IngrUsuario($idEmpleado){
		$sentUsuario = "select * from empleado where id_empleado=". $idEmpleado;
		$res = parent::leer($sentUsuario);
			return $res;
	}
	
	public function listaLibroYgenero(){
		$sentLibros = "select * from libro inner join genero on libro.gen_idGen = genero.id_genero";
		$resp = parent::leer($sentLibros);
		return $resp;
	}
	
	public  function actualizarLibro($isbn,$genero,$desc,$titulo) {
		$sentActLib ="update libro set titulo='$titulo', descripcionLib='$desc', gen_idGen = '$genero' where isbn=".$isbn;
		parent::crearActualizarEliminar($sentActLib);
	}
	
	public function crearLibro($titulo,$desc,$genero) {
		$sentUltimoISBN = "select isbn from libro order by isbn desc limit 1";
		$ultimoISBN = parent::leer($sentUltimoISBN);
		$arrayUltISBN = $ultimoISBN->fetchAll(PDO::FETCH_ASSOC);
		$isbn = $arrayUltISBN[0]["isbn"] + 1;
		$sentCrear = "insert into libro (isbn, titulo, descripcionLib, gen_idGen)values('$isbn','$titulo','$desc','$genero')";
		parent::crearActualizarEliminar($sentCrear);
	}
	
	public function eliminarLibro($isbnElim) {
		$sentenciaElim = "delete from libro where isbn =".$isbnElim;
		parent::crearActualizarEliminar($sentenciaElim);
	}
}