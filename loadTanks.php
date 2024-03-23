<?php
include 'config.php';

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM tanks";

try {
    $result = $conn->query($sql);

    if ($result === false) {
        throw new Exception("Error executing the query: " . $conn->error);
    }

    if ($result->num_rows > 0) {
        // Output data of each row
        $tanks = array();
        while($row = $result->fetch_assoc()) {
            $tanks[] = $row;
        }
        echo json_encode($tanks);
    } else {
        echo "0 results";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$conn->close();
?>
