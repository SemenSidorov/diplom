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
    $res = $db->Update('users', $id, [
        "NAME" => $_GET["NAME"], 
        "LAST_NAME" => $_GET["LAST_NAME"], 
        "MIDDLE_NAME" => $_GET["MIDDLE_NAME"], 
        "IS_ADMIN" => $_GET["IS_ADMIN"], 
        "GROUP_NUMBER" => $_GET["GROUP_NUMBER"], 
        "CREDIT_BOOK_NUMBER" => $_GET["CREDIT_BOOK_NUMBER"], 
        "PHONE_NUMBER" => $_GET["PHONE_NUMBER"], 
        "EMAIL" => $_GET["EMAIL"]
    ]);
    if($res == $id) echo "success" else echo json_encode("ERROR" => $res);
}else{
    echo json_encode(["ERROR" => "Пользователя с таким ID не существует"]);
}