<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//echo $request->name;


  $id=(int)$request->owner;

  // prepare statement
  if (!($select = $mysqli->prepare("SELECT id, name, start,length,progress,notes FROM Projects WHERE owner = ?"))) {
    echo "Uh oh. Prepare statement failed : (" . $insert->errno . ") " . $insert->error;
  }
  // bind
  if (!$select->bind_param("i", $id)) {
    echo "Uh oh. Bind statement failed : (" . $select->errno . ") " . $insert->error;
  }
  // execute
  if (!$select->execute()) {
    echo "Uh oh. Execute statement failed : (" . $select->errno . ") " . $insert->error;
  }

  $did = null;
  $dname = null;
  $dstart = null;
  $dlength = null;
  $dprogress = null;
  $dnotes = null;

  if (!$select->bind_result($did,$dname, $dstart, $dlength, $dprogress, $dnotes )) {
    echo "Binding output parameters failed: (" . $select->errno . ") " . $select->error;
  }
  $resultArr = array();

  while ($select->fetch()) {
    $resultArr[] = $dname . "/|" . $dstart ."/|" . $dlength . "/|" . $dprogress . "/|" . $dnotes. "/|" . $did;
  }
  echo json_encode($resultArr);

  $select->close();
?>
