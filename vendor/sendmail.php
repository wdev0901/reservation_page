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
    $mail->Username   = 'qr177177@gmail.com';                     //SMTP username
    $mail->Password   = 'goshawk0420)(!^';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('dmitri@email.com', 'Mailer');
    $mail->addAddress('robbie626827@gmail.com', 'egor518');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    $mail->addReplyTo('info@egor518.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'WEB予約フォーム';
    $mail->Body    = "'<p><b>名字（漢字): </b>'.$inputNameGanji.'<br>' '<b>名前(フリガナ): </b>'.$inputNameKana.'<br>''<b>予約希望場所: </b>'.$inputPlace.'<br>'.'<b>予約希望時間: </b>'.$inputTime";
    $mail->AltBody = "'名字（漢字): '.$inputNameGanji.'名前(フリガナ): '.$inputNameKana.'予約希望場所: '.$inputPlace.'予約希望時間: '.$inputTime";

    $mail->send();
    // echo 'Message has been sent';
    return json_encode(array('status' => true));
} catch (Exception $e) {
    // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    return json_encode($mail->ErrorInfo);
}
