<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$result = $db->GetList('elements', ["IBLOCK_ID" => 2, ">=DATE_START" => (time() + 60*60*24), "<=DATE_EXP" => (time() + 60*60*24*2)], ['ID', "NAME", "DATE_START"]);
$events_id = [];
$events = [];
foreach($result as $res){
    $events_id[] = $res["ID"];
    $events[$res["ID"]] = $res;
}
$manytomany = $db->GetList('users_events', ["EVENT_ID" => $events_id], ['USER_ID', 'EVENT_ID']);
$users_id = [];
foreach($manytomany as $id){
    $users_id[] = $id["USER_ID"];
}
$arUsers = $db->GetList('users', ["ID" => $users_id], ["NAME", "EMAIL"]);
$users = [];
foreach($arUsers as $user){
    $users[$user["ID"]] = $user;
}

require_once ($_SERVER['DOCUMENT_ROOT'].'/include/phpmailer/PHPMailerAutoload.php');

foreach($manytomany as $user){
    $mail = new PHPMailer;
    $mail->CharSet   = 'UTF-8';
    $mail->From      = 'lol.testmail.kek@mail.ru';
    $mail->FromName  = 'Напоминание о предстоящем мероприятии';
    $mail->Subject   = 'Напоминание о предстоящем мероприятии';
    $mail->Body      = "Увожаемый " . $users[$user["USER_ID"]]["NAME"] . ", напоминаем вам, 
    что вы записаны на мероприятие '" . $events[$user["EVENT_ID"]]["NAME"] . "', 
    которое пройдёт завтра в " . date("H:i", $events["DATE_START"]);
    $mail->AddAddress($users[$user["USER_ID"]]["EMAIL"]);
    $mail->Send();
    unset($mail);
}
