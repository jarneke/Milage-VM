<?php
// Include the database configuration
include 'config.php';

// Query to fetch all data from tanks table
$sql = "SELECT * FROM tanks";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<div class='tank'>";
        echo "<p>Tank Date: " . $row["tankDate"] . "</p>";
        echo "<p>Cost: $" . $row["cost"] . "</p>";
        echo "</div>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
