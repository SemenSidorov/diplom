<?
  $result = '';

  $test = $_POST["test"] ? $_POST["test"] : '';
  if($test !== ''){
    echo "success";
    die;
  }

  $name = $_POST["name"] ? $_POST["name"] : '';
  $phone = $_POST["phone"] ? $_POST["phone"] : '';
  $email = $_POST["email"] ? $_POST["email"] : '';
  $message = $_POST["message"] ? $_POST["message"] : '';

  $flag = true;

  if($name === ''){
      echo 'Ошибка! Не заполнено обязательное поле "Ваше имя"!';
      $flag = false;
  }
  if($phone === ''){
      echo 'Ошибка! Не заполнено обязательное поле "Ваш телефон"!';
      $flag = false;
  }

  if(!$flag) die;

  require_once ($_SERVER['DOCUMENT_ROOT'].'/include/phpmailer/PHPMailerAutoload.php');

  $output = "Имя пользователя: " . $name . "\n";
  $output .= "Телефон: " . $phone . "\n";
  $output .= "E-mail: " . $email . "\n";
  $output .= "Сообщение: " . $message . "\n";

  $mail = new PHPMailer;

  $mail->CharSet = 'UTF-8';
  $mail->From      = 'lol.testmail.kek@mail.ru';
  $mail->FromName  = 'Сообщение с формы обратной связи';
  $mail->Subject   = 'Сообщение с формы обратной связи';
  $mail->Body      = $output;

  $mail->AddAddress( 'semen_sidorov_1999@mail.ru' );

  if ($mail->Send()) {
      echo "success";
  } else {
      echo "Произошел как-то сбой! Попробуйте еще раз!";
  }
?>