<?php

$name = htmlspecialchars($_POST["name"]);
$phone = htmlspecialchars($_POST["phone"]);
$checkbox = $_POST["checkbox"];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;

$mail->Host = 'ssl://server17.hosting.reg.ru';
$mail->Port = 465;
$mail->Username = 'admin@mybutton.ru';
$mail->Password = 'R3a2D2x7';

// От кого
$mail->From = 'admin@mybutton.ru';
$mail->FromName = 'admin';

// Кому
$mail->addAddress('mybutton.on@gmail.com', 'admin');

// Тема письма
$mail->Subject = 'Заявка с сайта Гостиница Миасс';

$mail->isHTML(true);

if (strlen($name) >= 3 &&
   strlen($name) <= 20 &&
   strlen($phone) == 18 && 
   $checkbox) {

  // Тело письма
  $mail->Body = "Имя: $name<br> Телефон: $phone<br>";
  $mail->AltBody = "Имя: $name\r\n Телефон: $phone\r\n";

  $mail->send();

}

$mail->smtpClose();

?>