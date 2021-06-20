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
    $targetPath = '';
    if($_FILES['PREVIEW_PICTURE']){
        $sourcePath = $_FILES['PREVIEW_PICTURE']["tmp_name"];
        $type = end(explode(".",$_FILES['PREVIEW_PICTURE']['name']));
        if($sourcePath!='' && $type){
            $dir = $_SERVER["DOCUMENT_ROOT"]."/BackEnd/include/img/news/".(int)$result."/";
            //Шифруем файл
            $fileName = hash("crc32",'BRV'.$dir.time()."_PREVIEW_PICTURE").".".$type;
            $targetPath = $dir.$fileName;
            try{
                mkdir($dir,0755, true);
            }catch(ErrorException $ex){
                $er = $ex->getMessage();
            }
    
            if(!move_uploaded_file($sourcePath,$targetPath)) die(json_encode(["ERROR" => "Ошибка добавления файла"]));
        }
    }
    $arFileds = [];
    if($_GET["NAME"]) $arFileds["NAME"] = $_GET["NAME"];
    if($_GET["LAST_NAME"]) $arFileds["LAST_NAME"] = $_GET["LAST_NAME"];
    if($_GET["MIDDLE_NAME"]) $arFileds["MIDDLE_NAME"] = $_GET["MIDDLE_NAME"];
    if($_GET["GROUP_NUMBER"]) $arFileds["GROUP_NUMBER"] = $_GET["GROUP_NUMBER"];
    if($_GET["CREDIT_BOOK_NUMBER"]) $arFileds["CREDIT_BOOK_NUMBER"] = $_GET["CREDIT_BOOK_NUMBER"];
    if($_GET["PHONE_NUMBER"]) $arFileds["PHONE_NUMBER"] = $_GET["PHONE_NUMBER"];
    if($_GET["EMAIL"]) $arFileds["EMAIL"] = $_GET["EMAIL"];
    if($targetPath) $arFileds["PREVIEW_PICTURE"] = $targetPath;
    $res = $db->Update('users', $id, [$arFileds]);
    if($res == $id) echo "success" else echo json_encode("ERROR" => $res);
}else{
    echo json_encode(["ERROR" => "Пользователя с таким ID не существует"]);
}