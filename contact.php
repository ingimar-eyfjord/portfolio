<?php
if ($_POST["submit"] == "yes") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $phneNr = $_POST["phneNr"];
    $body = $_POST["body"];

    $mailTo = "ingimar@ingimar.dk";
    $header = "From: " . $email;
    $text = "Email from " . $name . ".\n\n" . $body;
    mail($mailTo, $subject, $text, $header);
    echo $name;
}