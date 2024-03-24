<?php
// Include the database configuration
include 'config.php';


$prev = $_POST['previous'];
$curr = $_POST['current'];

// Query to fetch all data from tanks table
$sql = 'SELECT * FROM trips WHERE tripDate < "' . $curr . '" && tripDate > "' . $prev . '"';
$result = $mysqli->query($sql); // Use $mysqli instead of $conn

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<div class='trip'>";
        echo "<p>User: " . $row['user'] . "</p>";
        echo "<p>tripDate: " . $row['tripDate'] . "</p>";
        echo "<p>sm: " . $row['sm'] . "</p>";
        echo "<p>em: " . $row['em'] . "</p>";
        echo "</div>";
    }
} else {
    echo "0 results";
}
$mysqli->close(); // Use $mysqli instead of $conn
?>
