<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$admin_id = $_GET["ADMIN_ID"];
$check_user = $db->GetList('users', ["ID" => $admin_id, "TOKEN" => $token]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    if(!$check_user[0]["IS_ADMIN"]) die(json_encode(["ERROR" => "Не админ"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}else{
    die(json_encode(["ERROR" => "Пользователя с таким токеном не существует"]));
}

$check_user = $db->GetList('users', ["ID" => $id]);
if($check_user){
    echo json_encode($check_user[0]);
}else{
    echo json_encode(["ERROR" => "Пользователя с таким ID не существует"]);
}