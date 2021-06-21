<?
ini_set('display_errors', 0);
require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$login = $_POST["LOGIN"];
$check_user = $db->GetList('users', ["LOGIN" => $login], ["ID"]);
if($check_user){
    echo json_encode(["ERROR" => "Пользователь с таким логином уже существует"]);
    die;
}
if(!$password = password_hash($_POST["PASSWORD"], PASSWORD_DEFAULT)){
    echo json_encode(["ERROR" => "Ошибка хеширования пароля"]);
    die;
}

$str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ1234567890";
$rand_num = rand(0, 63);
$str = str_shuffle($str);
$token = substr($str, $rand_num, 11);

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
$arFileds = ["LOGIN" => $login, 
            "PASSWORD" => $password, 
            "LAST_AUTH" => time(), 
            "TOKEN" => $token
            ];
if($_POST["NAME"]) $arFileds["NAME"] = $_POST["NAME"];
if($_POST["LAST_NAME"]) $arFileds["LAST_NAME"] = $_POST["LAST_NAME"];
if($_POST["GROUP_NUMBER"]) $arFileds["GROUP_NUMBER"] = $_POST["GROUP_NUMBER"];
if($_POST["CREDIT_BOOK_NUMBER"]) $arFileds["CREDIT_BOOK_NUMBER"] = $_POST["CREDIT_BOOK_NUMBER"];
if($_POST["PHONE_NUMBER"]) $arFileds["PHONE_NUMBER"] = $_POST["PHONE_NUMBER"];
if($_POST["EMAIL"]) $arFileds["EMAIL"] = $_POST["EMAIL"];
if($targetPath) $arFileds["PREVIEW_PICTURE"] = $targetPath;
$result = $db->Add('users', $arFileds);
if((int)$result){
    echo json_encode(["LOGIN" => $login, "TOKEN" => $token, "PREVIEW_PICTURE" => $targetPath, "ID" => $result]);
}else{
    echo json_encode(["ERROR" => $result]);
}