<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//echo $request->name;
//, $postdata->category, $postdata->length";
  //  $request = json_decode($postdata);
  // //  $category = $request->category;
  // //  $length = $request->$length;
  // //  $name = $request->$name;
  //  echo $request;
  //  echo json_encode($request);
  //  echo "$email, $length,  $name";

  //$data = "Hit login !";
  //echo json_encode($data);
  // let's add this pup to the server!
  //if ($data) {


  $name=$request->name;
  $email=$request->email;
  $beforeHash= $request->password;
  $password = crypt($beforeHash, '$andrew');

    //echo "name: $name, cat: $category, Len: $length,  ";
    // prepare statement
    if (!($insert = $mysqli->prepare("INSERT INTO Users(name, email, password) VALUES(?, ?, ?)"))) {
      echo "Uh oh. Prepare statement failed : (" . $insert->errno . ") " . $insert->error;
    }
    // bind
    if (!$insert->bind_param("sss", $name, $email, $password)) {

      echo "Uh oh. Bind statement failed : (" . $insert->errno . ") " . $insert->error;
    }
    // execute
    if (!$insert->execute()) {
      if ($insert->errno == "1062") {
        echo "dup";
      }
      //echo "Uh oh. Execute statement failed : (" . $insert->errno . ") " . $insert->error;
    } else {
      echo "ok";
    }

    //$data = "AWESOMEE!";
    //header('Content-Type: application/json');
    //echo json_encode($data);

    $insert->close();
?>
