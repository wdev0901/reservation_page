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

//get MailData
$inputNameGanji = $_POST['inputNameGanji'];
$inputNameKana = $_POST['inputNameKana'];
$inputPlace = $_POST['inputPlace'];
$inputTime = $_POST['inputTime'];

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
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;  

    //Recipients
    $mail->setFrom('From@example.com', 'ジーラボ株式会社');
    $mail->addAddress('To@example.com', 'ジーラボ株式会社');     //Add a recipient
    $mail->addReplyTo('info@example.com', 'Information');

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'WEB予約フォーム';
    $mail->Body    = '<h1>イベントの予約申し込みがありました。</h1><p> <h2>下記の通り、イベント予約の申し込みがありました。<br>ご確認の上ご対応の程よろしくお願いいたします。</h2><p> <h3><b>名字（漢字): </b>' . $inputNameGanji . '</h3><p><h3><b>名前(フリガナ): </b>' . $inputNameKana . '</h3><p><h3><b>予約希望場所: </b>' . $inputPlace . '</h3><p><h3><b>予約希望時間: </b>' . $inputTime . '</h3>';
    $mail->AltBody = 'イベントの予約申し込みがありました。 下記の通り、イベント予約の申し込みがありました。ご確認の上ご対応の程よろしくお願いいたします。 名字（漢字): ' . $inputNameGanji . '名前(フリガナ): ' . $inputNameKana . '予約希望場所: ' . $inputPlace . '予約希望時間: ' . $inputTime;
    $mail->send();

    echo 'Message has been sent!';
       
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error:";
}
