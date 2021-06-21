<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$login = $_GET["LOGIN"];
$password = $_GET["PASSWORD"];
$check_user = $db->GetList('users', ["LOGIN" => $login], ["ID", "LOGIN", "PASSWORD", "NAME", "LAST_NAME", "IS_ADMIN"]);

$str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ1234567890";
$rand_num = rand(0, 63);
$str = str_shuffle($str);
$token = substr($str, $rand_num, 11);

if($check_user){
    if($db->Update('users', $check_user[0]["ID"], ["TOKEN" => $token, "LAST_AUTH" => time()]) == $check_user[0]["ID"]){
        echo json_encode(password_verify($password, $check_user[0]["PASSWORD"]) ? ["ID" => $check_user[0]["ID"], "LOGIN" => $login ,"TOKEN" => $token, "NAME" => $check_user[0]["NAME"] . " " . $check_user[0]["LAST_NAME"], "IS_ADMIN" => $check_user[0]["IS_ADMIN"]] : ["ERROR" => "Не правильный пароль"]);
    }else{
        echo json_encode(["ERROR" => "Ошибка авторизации"]);
    }
}else{
    echo json_encode(["ERROR" => "Пользователя с таким логином не существует"]);
}