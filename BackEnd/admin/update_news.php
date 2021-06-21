<?
ini_set('display_errors', 0);
require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$errors = [];
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

$news_id = $_POST["NEWS_ID"];
$name = $_POST["NAME"];
$preview_text = $_POST["PREVIEW_TEXT"];
$detail_text = $_POST["DETAIL_TEXT"];

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

$arFields = [];
if($name) $arFields["NAME"] = $name;
if($targetPath) $arFields["PREVIEW_PICTURE"] = $targetPath;
if($preview_text) $arFields["PREVIEW_TEXT"] = $preview_text;
if($detail_text) $arFields["DETAIL_TEXT"] = $detail_text;

if($arFields){
    $result = $db->Update("elements", $news_id, $arFields);

    if(!(int)$result){
        die(json_encode($result));
    }

    if($_FILES['ADD_PICTURES']){
        $add_pics_in_new = $db->GetList('properties', ["NAME" => 'ADD_PICTURES', "PARENT_ID" => $news_id]);
        foreach($add_pics_in_new as $apin_id){
            $db->Remove('properties', $apin_id["ID"]);
        }
        foreach($_FILES['ADD_PICTURES']['tmp_name'] as $sect => $val){
            $sourcePath = $val;
            $type = end(explode(".",$_FILES['ADD_PICTURES']['name'][$sect]));
            if($sourcePath!='' && $type){
                $dir = $_SERVER["DOCUMENT_ROOT"]."/BackEnd/include/img/news/".(int)$result."/";
                //Шифруем файл
                $fileName = hash("crc32",'BRV'.time()."_".$sect).".".$type;
                $targetPath = $dir.$fileName;
                try{
                    mkdir($dir,0755, true);
                }catch(ErrorException $ex){
                    $er = $ex->getMessage();
                }

                move_uploaded_file($sourcePath,$targetPath);
                $res = $db->Add("properties", [
                    "PARENT_ID" => $result,
                    "NAME" => 'ADD_PICTURES',
                    "VALUE" => $targetPath
                ]);
                if(!(int)$res){
                    $errors[json_encode($res)];
                }
            }
        }
    }
    echo json_encode(["NEWS_ID" => $result, "ERRORS" => $errors]);
}
