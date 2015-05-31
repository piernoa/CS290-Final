<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//echo $request->name;


  $email=$request->email;
  $password= $request->password;

  // prepare statement
  if (!($select = $mysqli->prepare("SELECT name, email, password, id FROM Users WHERE email = ?"))) {
    echo "Uh oh. Prepare statement failed : (" . $insert->errno . ") " . $insert->error;
  }
  // bind
  if (!$select->bind_param("s", $email)) {
    echo "Uh oh. Bind statement failed : (" . $insert->errno . ") " . $insert->error;
  }
  // execute
  if (!$select->execute()) {
    echo "Uh oh. Execute statement failed : (" . $insert->errno . ") " . $insert->error;
  }

  $dname = null;
  $demail = null;
  $dpassword = null;
  $did = null;

  if (!$select->bind_result($dname, $demail, $dpassword, $did )) {
    echo "Binding output parameters failed: (" . $select->errno . ") " . $select->error;
  }
  while ($select->fetch()) {
    if ($dpassword == crypt($password, '$andrew')) {
      echo "Password_Accepted\|$dname\|$demail\|$did\|";
    } else {
      echo json_encode("Fail");
    }
  }

  //header('Content-Type: application/json');
  //echo json_encode($data);

  $select->close();
?>
