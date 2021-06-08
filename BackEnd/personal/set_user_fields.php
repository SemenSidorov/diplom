<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 > time()){
        $res = $db->Update('users', $id, [
            "NAME" => $_GET["NAME"], 
            "LAST_NAME" => $_GET["LAST_NAME"], 
            "MIDDLE_NAME" => $_GET["MIDDLE_NAME"], 
            "IS_ADMIN" => $_GET["IS_ADMIN"], 
            "GROUP_NUMBER" => $_GET["GROUP_NUMBER"], 
            "CREDIT_BOOK_NUMBER" => $_GET["CREDIT_BOOK_NUMBER"], 
            "PHONE_NUMBER" => $_GET["PHONE_NUMBER"], 
            "EMAIL" => $_GET["EMAIL"],
            "LAST_AUTH" => time()
        ]);
        if($res == $id) echo "success" else echo json_encode("ERROR" => $res);
    }else{
        echo json_encode(["ERROR" => "Пользователь не авторизован"]);
    }
}else{
    echo json_encode(["ERROR" => "Пользователя с таким токеном не существует"]);
}
