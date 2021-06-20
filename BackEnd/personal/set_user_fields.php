<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_POST["TOKEN"];
$id = $_POST["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 > time()){
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
        $arFileds = ["LAST_AUTH" => time()];
        if($_POST["NAME"]) $arFileds["NAME"] = $_POST["NAME"];
        if($_POST["LAST_NAME"]) $arFileds["LAST_NAME"] = $_POST["LAST_NAME"];
        if($_POST["MIDDLE_NAME"]) $arFileds["MIDDLE_NAME"] = $_POST["MIDDLE_NAME"];
        if($_POST["GROUP_NUMBER"]) $arFileds["GROUP_NUMBER"] = $_POST["GROUP_NUMBER"];
        if($_POST["CREDIT_BOOK_NUMBER"]) $arFileds["CREDIT_BOOK_NUMBER"] = $_POST["CREDIT_BOOK_NUMBER"];
        if($_POST["PHONE_NUMBER"]) $arFileds["PHONE_NUMBER"] = $_POST["PHONE_NUMBER"];
        if($_POST["EMAIL"]) $arFileds["EMAIL"] = $_POST["EMAIL"];
        if($targetPath) $arFileds["PREVIEW_PICTURE"] = $targetPath;
        $res = $db->Update('users', $id, [$arFileds]);
        if($res == $id) echo "success" else echo json_encode("ERROR" => $res);
    }else{
        echo json_encode(["ERROR" => "Пользователь не авторизован"]);
    }
}else{
    echo json_encode(["ERROR" => "Пользователя с таким токеном не существует"]);
}
