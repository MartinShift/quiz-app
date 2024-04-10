<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$target_dir = "D:\Mein progectos\angular\quiz-app\src\assets\images";
$target_file = $target_dir . "/" . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    $response = array(
        "success" => true,
        "message" => "The file " . htmlspecialchars(basename($_FILES["file"]["name"])) . " has been uploaded."
    );
    echo json_encode($response);
} else {
    $response = array(
        "success" => false,
        "message" => "Sorry, there was an error uploading your file."
    );
    echo json_encode($response);
}
?>
