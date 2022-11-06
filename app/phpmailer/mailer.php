<?php

$name = htmlspecialchars($_POST["name"]);
$phone = htmlspecialchars($_POST["phone"]);
$email = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
 
// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 1;

$mail->Host = 'ssl://server17.hosting.reg.ru';
$mail->Port = 25;
$mail->Username = 'admin@unecoms-consalt.ru';
$mail->Password = 'oI6kD4qB9itX2h';

// От кого
$mail->From = 'admin@unecoms-consalt.ru';
$mail->FromName = 'admin';

// Кому
$mail->addAddress('sales@unecoms.ru', 'admin');
 
// Тема письма
$mail->Subject = 'Вопрос с сайта Unecoms Consulting';

$mail->isHTML(true);

// Тело письма
$mail->Body = "Имя: $name<br> Телефон: $phone<br> Email: $email<br> Сообщение: $message";
$mail->AltBody = "Имя: $name\r\n Телефон: $phone\r\n Email: $email\r\n Сообщение: $message";

// if ($mail->send()) {
//   echo "ok";
// } else {
//   $mail->ErrorInfo;
// }

$mail->send();


?>