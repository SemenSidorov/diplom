<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_POST["TOKEN"];
$id = $_POST["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token], ["ID", "IS_ADMIN", "LAST_AUTH"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    if(!$check_user[0]["IS_ADMIN"]) die(json_encode(["ERROR" => "Не админ"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}else{
    die(json_encode(["ERROR" => "Пользователя с таким токеном не существует"]));
}

$name = $_POST["NAME"];
$preview_text = $_POST["PREVIEW_TEXT"];
$detail_text = $_POST["DETAIL_TEXT"];
$date_start = strtotime($_POST["DATE_START"]);
$date_exp = strtotime($_POST["DATE_EXT"]);
$hash = hash('ripemd160', $name);

if($_FILES['PREVIEW_PICTURE']){
    $sourcePath = $_FILES['PREVIEW_PICTURE']["tmp_name"];
    $type = end(explode(".",$_FILES['PREVIEW_PICTURE']['name']));
    if($sourcePath!='' && $type){
        $dir = $_SERVER["DOCUMENT_ROOT"]."/BackEnd/include/img/news/".(int)$result."/";
        //Шифруем файл
        $fileName = hash("crc32",'BRV'.$dir."_PREVIEW_PICTURE").".".$type;
        $targetPath = $dir.$fileName;

        if(!move_uploaded_file($sourcePath,$targetPath)) die(json_encode(["ERROR" => "Ошибка добавления файла"]));
    }
}

$result = $db->Add("elements", [
    "IBLOCK_ID" => 2, 
    "NAME" => $name, 
    "PREVIEW_PICTURE" => $targetPath, 
    "PREVIEW_TEXT" => $preview_text, 
    "DETAIL_TEXT" => $detail_text,
    "DATE_START" => $date_start,
    "DATE_EXT" => $date_exp
]);

if(!(int)$result){
    die(json_encode($result));
}
echo json_encode(["EVENT_ID" => $result]);