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

$result = $db->Add('users', ["LOGIN" => $login, "PASSWORD" => $password, "LAST_AUTH" => time(), "TOKEN" => $token]);
if((int)$result){
    echo json_encode(["LOGIN" => $login, "TOKEN" => $token, "ID" => $result]);
}else{
    echo json_encode(["ERROR" => $result]);
}