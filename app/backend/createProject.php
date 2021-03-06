<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Variables
$name=$request->name;
$start= $request->start;
$length = (int)$request->length;
$notes = $request->notes;
$progress = (int)$request->progress;
$owner = (int)$request->owner;
$public = (int)$request->public;

$votes = 0;
//echo "name: $name, start: $start, length: $length, notes: $notes, progress: $progress, owner: $owner";
// prepare statement
if (!($select = $mysqli->prepare("INSERT INTO Projects(name, start, length, progress, notes, owner, public, votes) VALUES(?, ?, ?, ?, ?, ?,?, ?)"))) {
  echo "Uh oh. Prepare statement failed : (" . $select->errno . ") " . $select->error;
}
// bind
if (!$select->bind_param("ssiisiii", $name, $start, $length, $progress, $notes, $owner, $public, $votes)) {
  echo "Uh oh. Bind statement failed : (" . $select->errno . ") " . $select->error;
}
// execute
if (!$select->execute()) {
  echo json_encode("Insertion failed");
} else {
  echo json_encode("insert_success");
}

//header('Content-Type: application/json');
//echo json_encode($data);

$select->close();
?>
