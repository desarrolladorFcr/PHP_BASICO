<?php

class ManejoDB {

    private static function proceso($sentencia) {
        try {
            $conx = new PDO("mysql:host=localhost;dbname=practica", "usuario", "contraseña", 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
            $conx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $res = $conx->query($sentencia);
            $conx = null;
            return $res;
        } catch (PDOException $err) {
            echo "Fallo en conexion" . $err->getMessage();
        }
    }

    protected static function crearActualizarEliminar($sentencia) {
        self::proceso($sentencia);
    }

    protected static function leer($sentencia) {
        $res = self::proceso($sentencia);
        return $res;
    }

}
