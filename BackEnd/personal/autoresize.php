<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$login = $_GET["LOGIN"];
$password = $_GET["PASSWORD"];
$check_user = $db->GetList('users', ["LOGIN" => $login], ["ID", "LOGIN", "PASSWORD"]);

$str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ1234567890~!@#$%^&*_-+=";
$rand_num = rand(0, 63);
$str = str_shuffle($str);
$token = substr($str, $rand_num, $rand_num + 11);

if($check_user){
    if($db->Update('users', $check_user[0]["ID"], ["TOKEN" => $token, "LAST_AUTH" => time()]) == $check_user[0]["ID"]){
        echo json_encode(password_verify($password, $check_user[0]["PASSWORD"]) ? ["LOGIN" => $login ,"TOKEN" => $token] : ["ERROR" => "Не правильный пароль"]);
    }else{
        echo json_encode(["ERROR" => "Ошибка авторизации"]);
    }
}else{
    echo json_encode(["ERROR" => "Пользователя с таким логином не существует"]);
}