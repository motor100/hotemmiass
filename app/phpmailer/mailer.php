<?php

$name = htmlspecialchars($_POST["name"]);
$phone = htmlspecialchars($_POST["phone"]);
$start_date = htmlspecialchars($_POST["start_date"]);
$guest = htmlspecialchars($_POST["guest"]);
$checkbox = $_POST["checkbox"];

$data = $name . " " . $phone . " " . $start_date . " " . $guest . " " . $checkbox;

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
$mail->Password = 'sL3dB5wE2x';

// От кого
$mail->From = 'admin@mybutton.ru';
$mail->FromName = 'admin';

// Кому
$mail->addAddress('260443@mail.ru', 'admin');

// Тема письма
$mail->Subject = 'Заявка с сайта Гостиница Миасс';

$mail->isHTML(true);

if (strlen($name) >= 3 &&
   strlen($name) <= 50 &&
   strlen($phone) == 18 && 
   $checkbox) {

   // Тело письма
   if ($start_date && $guest) {
      $mail->Body = "Имя: $name<br> Телефон: $phone<br> Заезд: $start_date<br> Гостей: $guest<br>";
      $mail->AltBody = "Имя: $name\r\n Телефон: $phone\r\n Заезд: $start_date\r\n Гостей: $guest\r\n";
   } else {
      $mail->Body = "Имя: $name<br> Телефон: $phone<br>";
      $mail->AltBody = "Имя: $name\r\n Телефон: $phone\r\n";
   }

  $mail->send();

}

$mail->smtpClose();

?>