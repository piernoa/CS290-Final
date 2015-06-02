<?php
include "connection.php";

if ($mysqli->query("CREATE TABLE Projects(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  start VARCHAR(255),
  length INT,
  progress INT,
  notes VARCHAR(255),
  public BIT NOT NULL,
  votes   INT,
  owner INT UNSIGNED NOT NULL REFERENCES Users(id)
)")) {
  echo "Table created successfully";
} else {
  echo "Already Created";
}

if ($mysqli->query("CREATE TABLE Users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255),
  password VARCHAR(255)
)")) {
  echo "Users created successfully";
} else {
  echo "Already Created User Table";
}

?>
