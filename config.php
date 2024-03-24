<?php
// Basic connection settings
$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = 'root';
$databaseName = 'milage';

// Connect to the database
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName);

// Check if the connection was successful
if (!$mysqli) {
    die("Connection failed: " . mysqli_connect_error());
} else {
}
?>
