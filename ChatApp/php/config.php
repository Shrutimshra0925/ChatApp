<?php
  $conn = mysqli_connect("localhost", "root", "", "chats");
  if(!$conn){
    echo "Database connection error".mysqli_connect_error();
  }
?>