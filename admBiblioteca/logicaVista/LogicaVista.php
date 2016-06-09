<?php
class LogicaVista
{
	public function sustituirContenido($doc, $arrayCont){
		$diccPlantilla = array(
				"tituloSitio"=>"Biblioteca Central",
				"pieDePagina"=>"Todos los derechos reservados. Bogota, Colombia"
		);
		
	foreach ($diccPlantilla as $indice =>$valor){
		$doc = str_replace("{".$indice."}", $valor, $doc);
	}
	
	foreach ($arrayCont as $indice => $valor){
		$doc = str_replace("{".$indice."}", $valor, $doc);
	}
	
	print $doc;
	}
}