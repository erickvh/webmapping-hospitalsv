
<?php


function conexion($user,$password,$dbname,$port,$host){
$cadenaConexion = "host=$host port=$port dbname=$dbname user=$user password=$password";

$conexion = pg_connect($cadenaConexion) or die("Error en la Conexión: ".pg_last_error());

return $conexion;
}

function consulta($conexion,$id,$resultado){
    $sql = "SELECT * FROM especialidades where id='".$id."'";
        $ok = true;

        // Ejecutar la consulta:
         $rs = pg_query( $conexion, $sql );
        if( $rs )
        {
            // Obtener el número de filas:

             if( pg_num_rows($rs) > 0 )
            {
                $i=1;
                // Recorrer el resource y mostrar los datos:
                 while( $obj = pg_fetch_object($rs) )
                     echo "<b>Tipo:</b> ".$obj->especialidad."<br>";
                
                }
            else
                echo "<p>No se encontraron especialidades</p>";
        }
        else
            $ok = false;
        return $resultado;
    }

?>

