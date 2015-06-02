<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//echo $request->name;
  $public = 1;
  // prepare statement
  if (!($select = $mysqli->prepare("SELECT name, notes, progress FROM Projects WHERE public = ?"))) {
    echo "Uh oh. Prepare statement failed : (" . $insert->errno . ") " . $insert->error;
  }
  // bind
  if (!$select->bind_param("i", $public)) {
    echo "Uh oh. Bind statement failed : (" . $select->errno . ") " . $insert->error;
  }
  // execute
  if (!$select->execute()) {
    echo "Uh oh. Execute statement failed : (" . $select->errno . ") " . $insert->error;
  }

  $dname = null;
  $dnotes = null;
  $dprogress = null;

  if (!$select->bind_result($dname, $dnotes, $dprogress )) {
    echo "Binding output parameters failed: (" . $select->errno . ") " . $select->error;
  }
  $resultArr = array();

  while ($select->fetch()) {
    $resultArr[] = $dname . "/|" . $dnotes. "/|" . $dprogress;
  }
  echo json_encode($resultArr);

  $select->close();
?>
