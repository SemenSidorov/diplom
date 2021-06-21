<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 > time()){
        $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
        $result = $db->GetList('users', ["ID" => $_GET["ID"]]);
        if($result){
            if($result[0]["IS_ADMIN"] > 0){
                $result[0]["IS_ADMIN"] = true;
            }else{
                $result[0]["IS_ADMIN"] = false;
            }
            echo json_encode($result[0]);
        }else{
            echo json_encode(["ERROR" => "Пользователя с таким ID не существует"]);
        }
    }else{
        echo json_encode(["ERROR" => "Пользователь не авторизован"]);
    }
}else{
    echo json_encode(["ERROR" => "Пользователя с таким токеном не существует"]);
}