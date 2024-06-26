<?php
// Include the database configuration
include 'config.php';

// Query to fetch all data from tanks table
$sql = "SELECT * FROM tanks";
$result = $mysqli->query($sql); // Use $mysqli instead of $conn

if ($result->num_rows > 0) {
    // Output data of each row
    $i = 0;
    while($row = $result->fetch_assoc()) {
        echo "<div class='tank card col-12 col-md-5 col-lg-3 bg-secondary' data-id='" . $i . "'>";
        echo '<p class="bg-secondary text-white">Payed by: ' . $row["payedBy"] . '</p>';
        echo '<p class="bg-secondary text-white tankDate">Tank Date: ' . $row["fillDate"] . '</p>';
        echo '<p class="bg-secondary text-white">Cost: €' . $row["cost"] . '</p>';
        echo '<button type="button" class="btn btn-dark bg-dark text-white CalculateTank">Calculate tank</button>';
        echo "</div>";
        $i++;
    }
} else {
    echo "0 results";
}
$mysqli->close(); // Use $mysqli instead of $conn
?>
