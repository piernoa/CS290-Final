<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Variables
$name=$request->name;
// prepare statement
if (!($select = $mysqli->prepare("DELETE FROM Projects WHERE name = ?"))) {
  echo "Uh oh. Prepare statement failed : (" . $select->errno . ") " . $select->error;
}
// bind
if (!$select->bind_param("s", $name)) {
  echo "Uh oh. Bind statement failed : (" . $select->errno . ") " . $select->error;
}
// execute
if (!$select->execute()) {
  echo json_encode("fail");
} else {
  echo json_encode("success");
}

//header('Content-Type: application/json');
//echo json_encode($data);

$select->close();
?>
