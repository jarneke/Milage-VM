<?php
include 'config.php';

// Retrieve the form data sent via POST
$payedBy = $_POST['payedBy'];
$fillDate = $_POST['fillDate'];
$cost = $_POST['cost'];

// Prepare the SQL statement with placeholders
$sql = "INSERT INTO tanks (fillDate, cost, payedBy) VALUES (?, ?, ?)";

// Prepare the statement
$stmt = $mysqli->prepare($sql);

if ($stmt) {
    // Bind parameters
    $stmt->bind_param("sds", $fillDate, $cost, $payedBy);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Tank refill recorded successfully";
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
