<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token], ["ID", "IS_ADMIN", "LAST_AUTH"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    if(!$check_user[0]["IS_ADMIN"]) die(json_encode(["ERROR" => "Не админ"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}else{
    die(json_encode(["ERROR" => "Пользователя с таким токеном не существует"]));
}

$name = $_GET["NAME"];
$preview_text = $_GET["PREVIEW_TEXT"];
$detail_text = $_GET["DETAIL_TEXT"];
$date_start = strtotime($_GET["DATE_START"]);
$date_exp = strtotime($_GET["DATE_EXT"]);
$hash = hash('ripemd160', $name);

if(!empty($_FILES["PREVIEW_PICTURE"]) && exif_imagetype($_FILES['PREVIEW_PICTURE']['tmp_name']) && $_FILES["PREVIEW_PICTURE"]["error"] === 0){
    $destination = $_SERVER['DOCUMENT_ROOT'] . '/BackEnd/include/img/news/' . $hash . $time . "/" . $_FILES["PREVIEW_PICTURE"]["name"];
    if(!rename($_FILES['PREVIEW_PICTURE']['tmp_name'], $destination)){
        die(json_encode(["ERROR" => "Ошибка добавления файла"]));
    }
}

$result = $db->Add("elements", [
    "IBLOCK_ID" => 2, 
    "NAME" => $name, 
    "PREVIEW_PICTURE" => $destination, 
    "PREVIEW_TEXT" => $preview_text, 
    "DETAIL_TEXT" => $detail_text,
    "DATE_START" => $date_start,
    "DATE_EXT" => $date_exp
]);

if(!(int)$result){
    die(json_encode($result));
}
echo json_encode(["EVENT_ID" => $result]);