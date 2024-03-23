<?php
include 'config.php';
// Retrieve the form data sent via POST
$fillDate = $_POST['fillDate'];
$cost = $_POST['cost'];

$sql = "INSERT INTO tanks (fillDate, cost) VALUES ($fillDate, $cost);";
if ($mysqli->query($sql) === TRUE) {
    echo "Visit date recorded successfully";
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}
?>
