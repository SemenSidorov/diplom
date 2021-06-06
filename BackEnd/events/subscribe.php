<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token], ["ID", "IS_ADMIN", "LAST_AUTH"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}else{
    die(json_encode(["ERROR" => "Пользователя с таким токеном не существует"]));
}

$event_id = $_GET["EVENT_ID"];

$check_sub = $db->GetList('users_events', ["USER_ID" => $id, "EVENT_ID" => $event_id]);
if($check_sub){
    echo json_encode(["ERROR" => "Пользователь уже подписан на данное мероприятие"]);
}else{
    $db->Add('users_events', ["USER_ID" => $id, "EVENT_ID" => $event_id]);
    echo "success";
}
echo json_encode($check_user[0]);