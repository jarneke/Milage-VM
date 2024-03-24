<?php
// Include the database configuration
include 'config.php';


$prev = $_POST['previous'];
$curr = $_POST['current'];

// Query to fetch all data from tanks table
$sql = 'SELECT * FROM trips WHERE tripDate < "2024-03-25T17:16" && tripDate > "2024-03-24T16:50"';
$result = $mysqli->query($sql); // Use $mysqli instead of $conn

if ($result->num_rows > 0) {
    // Output data of each row
    $i = 0;
    while($row = $result->fetch_assoc()) {
        echo "<div class='tank' data-id='" . $i . "'>";
        echo "<p>Tank Date: " . $row["fillDate"] . "</p>";
        echo "<p>Cost: $" . $row["cost"] . "</p>";
        echo '<button type="button" class="CalculateTank">Calculate tank</button>';
        echo "</div>";
        $i++;
    }
} else {
    echo "0 results";
}
$mysqli->close(); // Use $mysqli instead of $conn
?>
