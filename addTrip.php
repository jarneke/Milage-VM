<?php
include 'config.php';

// Retrieve the form data sent via POST
$user = $_POST['user'];
$tripDate = $_POST['tripDate'];
$startMileage = $_POST['sm'];
$endMileage = $_POST['em'];

// Prepare the SQL statement with placeholders
$sql = "INSERT INTO trips (user, tripDate, sm, em) VALUES (?, ?, ?, ?)";

// Prepare the statement
$stmt = $mysqli->prepare($sql);

if ($stmt) {
    // Bind parameters
    $stmt->bind_param("ssii", $user, $tripDate, $startMileage, $endMileage);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Trip recorded successfully";
    } else {
        echo "Error executing query: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
} else {
    echo "Error preparing statement: " . $mysqli->error;
}

// Close the connection
$mysqli->close();
?>
