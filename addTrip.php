<?php
include 'config.php';
// Retrieve the form data sent via POST
$user = $_POST['user'];
$tripDate = $_POST['tripDate'];
$startMileage = $_POST['sm'];
$endMileage = $_POST['em'];


$sql = "INSERT INTO trips (user, tripDate, sm, em) VALUES ($user, $tripDate, $startMileage, $endMileage);";
if ($mysqli->query($sql) === TRUE) {
    echo "Visit date recorded successfully";
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}
?>
