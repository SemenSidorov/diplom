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

$id = (int)$_GET["ID"];

$result = $db->GetByID('elements', $id, ["NAME", "DETAIL_TEXT"]);
$pictures = $db->GetList('properties', ["ELEMENT_ID" => $id, "NAME" => "ADD_PICTURES"]);
if($pictures) $result["ADD_PICTURES"] = $pictures;
echo json_encode($result);