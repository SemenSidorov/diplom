<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$token = $_GET["TOKEN"];
$password = $_GET["PASSWORD"];
$check_user = $db->GetList('users', ["TOKEN" => $token], ["ID", "NAME", "LAST_NAME", "MIDDLE_NAME", "IS_ADMIN", "GROUP_NUMBER", "CREDIT_BOOK_NUMBER", "PHONE_NUMBER", "EMAIL"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 > time()){
        $db->Update('users', $check_user[0]["ID"], ["TOKEN" => $token, "LAST_AUTH" => time()]);
        echo json_encode($check_user[0]);
    }else{
        echo json_encode(["ERROR" => "Пользователь не авторизован"]);
    }
}else{
    echo json_encode(["ERROR" => "Пользователя с таким токеном не существует"]);
}