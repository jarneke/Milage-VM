<?php
include 'config.php';

$event_name = $_POST['event_name'];
$event_start_date = date("y-m-d", strtotime($_POST['event_start_date'])); 
$event_end_date = date("y-m-d", strtotime($_POST['event_end_date'])); 
			
$insert_query = "insert into `calendar_event_master`(`event_name`,`event_start_date`,`event_end_date`) values (?,?,?)";    

$stmt = $mysqli->prepare($insert_query);

if($stmt)
{
    $stmt->bind_param("sss", $event_name, $event_start_date, $event_end_date)

    if ($stmt->execute()) {
        $data = array(
            'status' => true,
            'msg' => 'Event added succesfully!'
        );

    } else {
        $data = array(
            'status' => false,
            'msg' => 'Sorry, Event not added.'				
        );
    }
}
echo json_encode($data);	
?>
