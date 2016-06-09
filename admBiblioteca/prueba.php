<?php
require_once 'lib/nusoap.php';

$cliente = new nusoap_client("http://localhost/defBiblioteca/admBiblioteca/controlador/controladorWebS.php&debug=0",'wsdl');
$resp = $cliente->call("listaLibros");
print_r($resp);