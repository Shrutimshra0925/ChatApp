<?php
session_start();
include_once "config.php";

$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$lname = mysqli_real_escape_string($conn, $_POST['lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

if (!empty($fname) && !empty($lname) && !empty($email) && !empty($password)) {
    // Check if the email is valid
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Check if the email already exists in the database
        $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
        if (mysqli_num_rows($sql) > 0) { // if email already exists
            echo "$email - This email already exists!";
        } else {
            // Check if an image file is uploaded
            if (isset($_FILES['image'])) { // if file is uploaded
                $img_name = $_FILES['image']['name']; // upload user name
                $tmp_name = $_FILES['image']['tmp_name']; // temporary name to save user file in our folder
                
                // exploding of image and get last extension 
                $img_explode = explode('.', $img_name);
                $img_ext = end($img_explode);  // here we have extension of user uploaded image files

                $extensions = ["jpeg", "png", "jpg"]; // valid extension name
                if (in_array($img_ext, $extensions) === true) { // if user extension is valid
                    $time = time(); // this will return current file time by which we can rename user file with current time, so that it can have a unique name
                    // moving of user uploaded image to my folder
                    $new_img_name = $time . $img_name;

                    if (move_uploaded_file($tmp_name, "images/" . $new_img_name)) { // if it is moved to our folder then it is active state
                        $status = "Active now"; // once user have signed up
                        $random_id = rand(time(), 100000000); // creating random id for user

                        // inserting data inside the table
                        $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status)
                                                              VALUES ('{$random_id}', '{$fname}', '{$lname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");
                        if ($sql2) { // if data is inserted
                            $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                            if (mysqli_num_rows($sql3) > 0) {
                                $row = mysqli_fetch_assoc($sql3);
                                $_SESSION['unique_id'] = $row['unique_id']; //using the session we need user unique_id in other php file
                                echo "success";     
                        }
                    } else {
                        echo "Something went wrong!";
                    }
                }
                } else {
                    echo "Please upload an image file - jpeg, png, jpg";
                }
            } else {
                echo "Please select an image file.";
            }
        }
    } else {
        echo "$email - this is not a valid email!";
    }
} else {
    echo "All input fields are required!";
}
?>
