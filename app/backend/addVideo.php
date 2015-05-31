<?php
include "connection.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
echo $request->name;
//, $postdata->category, $postdata->length";
  //  $request = json_decode($postdata);
  // //  $category = $request->category;
  // //  $length = $request->$length;
  // //  $name = $request->$name;
  //  echo $request;
  //  echo json_encode($request);
  //  echo "$email, $length,  $name";

  $data = "Hit Add Video!";
  //echo json_encode($data);
  // let's add this pup to the server!
  if ($data) {


  $name=$request->name;
  $category=$request->category;
  $length= $request->length;
  if ($name == "" || $category == "" || $length <= 0 || !is_numeric($length)) {
    if ($length <= 0 || !is_numeric($length)) {
      echo '<br>' .'<p class="error"> The length of the video must be greater than zero. Otherwise there\'s nothing to watch!</p>' . '<br>';
    }
    if ($name == "") {
      echo '<br>' . '<p class="error">' . "The video must have a name!" . '</p>' . '<br>';
    }
    if ($category == "") {
      echo '<br>' . '<p class="error">' . "The video must have a category!" . '</p>' . '<br>';
    }
  } else {
    //echo "name: $name, cat: $category, Len: $length,  ";
    // prepare statement
    if (!($insert = $mysqli->prepare("INSERT INTO Videos(name, category, length) VALUES(?, ?, ?)"))) {
      echo "Uh oh. Prepare statement failed : (" . $insert->errno . ") " . $insert->error;
    }
    // bind
    if (!$insert->bind_param("ssi", $name, $category, $length)) {
      echo "Uh oh. Bind statement failed : (" . $insert->errno . ") " . $insert->error;
    }
    // execute
    if (!$insert->execute()) {
      echo "Uh oh. Execute statement failed : (" . $insert->errno . ") " . $insert->error;
    }

    $data = "AWESOMEE!";
    header('Content-Type: application/json');
    echo json_encode($data);

    $insert->close();
  }
}
?>
