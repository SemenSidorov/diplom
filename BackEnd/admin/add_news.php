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
$time = time();
$hash = hash('ripemd160', $name);

if(!empty($_FILES["PREVIEW_PICTURE"]) && exif_imagetype($_FILES['PREVIEW_PICTURE']['tmp_name']) && $_FILES["PREVIEW_PICTURE"]["error"] === 0){
    $destination = $_SERVER['DOCUMENT_ROOT'] . '/BackEnd/include/img/news/' . $hash . $time . "/" . $_FILES["PREVIEW_PICTURE"]["name"];
    if(!rename($_FILES['PREVIEW_PICTURE']['tmp_name'], $destination)){
        die(json_encode(["ERROR" => "Ошибка добавления файла"]));
    }
}

$result = $db->Add("elements", [
    "IBLOCK_ID" => 1, 
    "NAME" => $name, 
    "PREVIEW_PICTURE" => $destination, 
    "PREVIEW_TEXT" => $preview_text, 
    "DETAIL_TEXT" => $detail_text,
    "DATE_START" => $time
]);

if(!(int)$result){
    die(json_encode($result));
}

foreach($_FILES["ADD_PICTURES"]["error"] as $key => $error){
    if(!$error && exif_imagetype($_FILES['ADD_PICTURES']['tmp_name'][$key])){
        $destination = $_SERVER['DOCUMENT_ROOT'] . '/BackEnd/include/img/news/' . $hash . $time . "/" . $_FILES["ADD_PICTURES"]["name"][$key];
        if(!rename($_FILES['ADD_PICTURES']['tmp_name'][$key], $destination)){
            die(json_encode(["ERROR" => "Ошибка добавления файла"]));
        }
        $res = $db->Add("elements", [
            "PARENT_ID" => $result, 
            "NAME" => 'ADD_PICTURES', 
            "VALUE" => $destination
        ]);
        if(!(int)$res){
            die(json_encode($res));
        }
    }
}
echo json_encode(["EVENT_ID" => $result]);