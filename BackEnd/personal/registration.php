<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$login = $_GET["LOGIN"];
$check_user = $db->GetList('users', ["LOGIN" => $login], ["ID"]);
if($check_user){
    echo json_encode(["ERROR" => "Пользователь с таким логином уже существует"]);
    die;
}
if(!$password = password_hash($_GET["PASSWORD"], PASSWORD_DEFAULT)){
    echo json_encode(["ERROR" => "Ошибка хеширования пароля"]);
    die;
}

$str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ1234567890~!@#$%^&*_-+=";
$rand_num = rand(0, 63);
$str = str_shuffle($str);
$token = substr($str, $rand_num, $rand_num + 11);

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
if($_GET["NAME"]) $arFileds["NAME"] = $_GET["NAME"];
if($_GET["LAST_NAME"]) $arFileds["LAST_NAME"] = $_GET["LAST_NAME"];
if($_GET["GROUP_NUMBER"]) $arFileds["GROUP_NUMBER"] = $_GET["GROUP_NUMBER"];
if($_GET["CREDIT_BOOK_NUMBER"]) $arFileds["CREDIT_BOOK_NUMBER"] = $_GET["CREDIT_BOOK_NUMBER"];
if($_GET["PHONE_NUMBER"]) $arFileds["PHONE_NUMBER"] = $_GET["PHONE_NUMBER"];
if($_GET["EMAIL"]) $arFileds["EMAIL"] = $_GET["EMAIL"];
if($targetPath) $arFileds["PREVIEW_PICTURE"] = $targetPath;
$result = $db->Add('users', );
if((int)$result){
    echo json_encode(["LOGIN" => $login, "TOKEN" => $token, "PREVIEW_PICTURE" => $targetPath, "ID" => $result]);
}else{
    echo json_encode(["ERROR" => $result]);
}