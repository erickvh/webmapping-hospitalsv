<?php 
include "consulta.php";
$host="localhost";
$db="sgg_db";
$pss="holamundo";
$user="postgres";
$port=5432;

$id=$_POST['id'];
$resultado="<h1>Lista de especialidades</h1><br>";
$conect=conexion($user,$pss,$db,$port,$host);
$resultado=consulta($conect,$id,$resultado);

?>