<?php
require 'database_connection.php'; 

// Check if event_id is set and not empty
if (isset($_POST['event_id']) && !empty($_POST['event_id'])) {
    $event_id = $_POST['event_id'];

    // Query to delete the event from the database
    $delete_query = "DELETE FROM calendar_event_master WHERE event_id = ?";
    $statement = $con->prepare($delete_query);
    $statement->bind_param('i', $event_id);

    // Execute the query
    if ($statement->execute()) {
        // If deletion is successful
        $response = array('status' => true, 'msg' => 'Event deleted successfully.');
    } else {
        // If deletion fails
        $response = array('status' => false, 'msg' => 'Failed to delete event.');
    }
} else {
    // If event_id is not set or empty
    $response = array('status' => false, 'msg' => 'Event ID not provided.');
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
