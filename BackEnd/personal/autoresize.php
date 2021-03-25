<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$login = $_GET["LOGIN"];
$password = $_GET["PASSWORD"];
$check_user = $db->GetList('users', ["LOGIN" => $login], ["ID", "LOGIN", "PASSWORD"]);

if(is_array($check_user)){
    echo json_encode(password_verify($password, $check_user[0]["PASSWORD"]) ? ["LOGIN" => $login ,"TOKEN" => $check_user[0]["PASSWORD"]] : ["ERROR" => "Не правильный пароль"]);
}else{
    echo json_encode(["ERROR" => "Пользователя с таким логином не существует"]);
}