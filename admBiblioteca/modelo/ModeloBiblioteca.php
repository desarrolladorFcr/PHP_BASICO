<?php
require_once '../persistencia/PersistenciaBiblioteca.php';

class ModeloBiblioteca
{
	private $persBiblioteca;
	
	public function __construct(){
		$this->persBiblioteca = new PersistenciaBiblioteca();
	}
	
	public function confirmUsuario($user, $pass){
		$res = $this->persBiblioteca->IngrUsuario($user);
		$arrayUser= $res->fetchall(PDO::FETCH_ASSOC);
		if($arrayUser==null){
			return $arrayError= array("error"=>"Usuario no registrado");
		}else {
			$clave = $arrayUser[0]["credencial"];
			if($clave==$pass){
				return $arrayUser;
			}else{
				return $arrayError= array("error"=>"Clave erronea");
			}
		}
	}
	
	public function listaLibroYgenero(){
		$res = $this->persBiblioteca->listaLibroYgenero();
		$arrayLibroYgenero = $res->fetchAll(PDO::FETCH_ASSOC);
		return $arrayLibroYgenero; 
	}
	
	public function generoEid(){
		$res = $this->persBiblioteca->generoEid();
		$arrayGenero = $res->fetchAll(PDO::FETCH_ASSOC);
		return $arrayGenero;
	}
	
	public function actualizarLibro($isbn,$genero,$desc,$titulo) {
		$this->persBiblioteca->actualizarLibro($isbn, $genero, $desc, $titulo);
	}
	
	public function crearLibro($titulo,$desc,$genero) {
		$this->persBiblioteca->crearLibro($titulo, $desc, $genero);
	}
	
	public function eliminarLibro($isbnElim) {
		$this->persBiblioteca->eliminarLibro($isbnElim);
	}
	
}		