<?php
phpinfo();
$host="127.0.0.1";
$port="5432";
$user="postgres";
$pass="holamundo";
$dbname="sgg_db";

$connect = pg_connect("host=$host, port=$port, user=$user, 
pass=$pass, dbname=$dbname");

if(!$connect)
echo "<p><i>No me conecte</i></p>";
else
echo "<p><i>Me conecte</i></p>";

pg_close($connect);
?>