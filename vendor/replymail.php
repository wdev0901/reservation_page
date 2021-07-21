<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/phpmailer/src/Exception.php';
require './phpmailer/phpmailer/src/PHPMailer.php';
require './phpmailer/phpmailer/src/SMTP.php';

//Load Composer's autoloader
require './autoload.php';

//get response Email
$replyEmail = $_POST['email'];

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'Your@gmail.com';                     //SMTP username
    $mail->Password   = 'YourPassword';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;  
    $mail->CharSet = PHPMailer::CHARSET_UTF8;                                   //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('From@example.com', 'ジーラボ株式会社');
    $mail->addAddress($replyEmail, 'ジーラボ株式会社');     //Add a recipient
    $mail->addReplyTo('info@example.com', 'Information');
   
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'WEB予約フォーム';
	$mail->Body    ="<h2>ホームページよりイベント予約のお申込みをありがとうございました。<p>下記の内容で予約の受付が完了しました。<p>当日は現地でお待ちしておりますので、よろしくお願いいたします。";
	$mail->AltBody ="ホームページよりイベント予約のお申込みをありがとうございました。下記の内容で予約の受付が完了しました。当日は現地でお待ちしておりますので、よろしくお願いいたします。";
        
	$mail->send();
	echo "Message has been sent!";

} catch (Exception $e) {
		echo "Message could not be sent. Mailer Error:";
	}
?>
