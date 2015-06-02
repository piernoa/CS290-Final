<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Variables
$id = (int)$request->id;
$votes = (int)$request->votes;

//echo "name: $name, start: $start, length: $length, notes: $notes, progress: $progress, owner: $owner";
// prepare statement
if (!($select = $mysqli->prepare("UPDATE Projects SET votes=? WHERE id=?"))) {
  echo "Uh oh. Prepare statement failed : (" . $select->errno . ") " . $select->error;
}
// bind
if (!$select->bind_param("ii", $votes, $id)) {
  echo "Uh oh. Bind statement failed : (" . $select->errno . ") " . $select->error;
}
// execute
if (!$select->execute()) {
  if ($select->errno == "1062") {
    echo "dup";
  }
} else {
  echo json_encode("insert_success");
}

$select->close();
?>
