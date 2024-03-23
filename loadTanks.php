<?php
include 'config.php';

$sql = "SELECT * FROM tanks";

$result = $conn->query($sql);

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
$conn->close();
?>