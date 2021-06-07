<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

die(json_encode($_FILES["PREVIEW_PICTURE"]));
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

$name = $_POST["NAME"];
$preview_text = $_POST["PREVIEW_TEXT"];
$detail_text = $_POST["DETAIL_TEXT"];
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
    "DATE_START" => $time,
    "DATE_EXP" => 0
]);

if(!(int)$result){
    die(json_encode($result));
}

if($_FILES['ADD_PICTURES']){
    foreach($_FILES['ADD_PICTURES']['tmp_name'] as $sect => $v){
        foreach($v as $kk => $vv){
            foreach($vv['FILE'] as $id => $val){
                $sourcePath = $val;
                $type = end(explode(".",$_FILES['prop']['name'][$sect][$kk]["FILE"][$id]));
                if($sourcePath!='' && $type){
                    $dir = $_SERVER["DOCUMENT_ROOT"]."/BackEnd/include/img/news/".(int)$result."/";
                    //Шифруем файл
                    $fileName = hash("crc32",'BRV'.$dir.$sect."_".$kk.$id).".".$type;
                    mkdir($dir,0755, true);
                    $targetPath = $dir.$fileName;
                    
                    move_uploaded_file($sourcePath,$targetPath);
                    unset($arForSer);
                    $res = $db->Add("elements", [
                        "PARENT_ID" => $result, 
                        "NAME" => 'ADD_PICTURES', 
                        "VALUE" => $destination
                    ]);
                    if(!(int)$res){
                        $errors[json_encode($res)];
                    }
                }
            }
        }
    }
}

// if(!empty($_FILES["ADD_PICTURES"])){
//     foreach($_FILES["ADD_PICTURES"]["error"] as $key => $error){
//         if(!$error && exif_imagetype($_FILES['ADD_PICTURES']['tmp_name'][$key])){
//             $destination = $_SERVER['DOCUMENT_ROOT'] . '/BackEnd/include/img/news/' . $hash . $time . "/" . $_FILES["ADD_PICTURES"]["name"][$key];
//             if(!rename($_FILES['ADD_PICTURES']['tmp_name'][$key], $destination)){
//                 die(json_encode(["ERROR" => "Ошибка добавления файла"]));
//             }
//             $res = $db->Add("elements", [
//                 "PARENT_ID" => $result, 
//                 "NAME" => 'ADD_PICTURES', 
//                 "VALUE" => $destination
//             ]);
//             if(!(int)$res){
//                 die(json_encode($res));
//             }
//         }
//     }
// }
echo json_encode(["NEWS_ID" => $result]);