<?php
// Include the database configuration
include 'config.php';

$prev = $_GET['prev'];
$curr = $_GET['curr'];
// Query to fetch all data from trips table
$sql = 'SELECT * FROM trips WHERE tripDate < "' . $curr . '" && tripDate > "' . $prev . '"';
$result = $mysqli->query($sql); // Use $mysqli instead of $conn

$data = array(); // Initialize an array to store the fetched rows

if ($result->num_rows > 0) {
    // Loop through each row and store it in the $data array
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo json_encode(array("status" => "error", "message" => "No results found"));
    exit(); // Exit if no results found
}

// Encode the $data array into JSON format
$json_data = json_encode($data);

// Output the JSON data
echo $json_data;

$mysqli->close(); // Use $mysqli instead of $conn
?>
