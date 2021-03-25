<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

$login = $_GET["LOGIN"];
$check_user = $db->GetList('users', ["LOGIN" => $login], ["ID"]);
if(is_array($check_user)){
    echo json_encode(["ERROR" => "Пользователь с таким логином уже существует"]);
    die;
}
if(!$password = password_hash($_GET["PASSWORD"], PASSWORD_DEFAULT)){
    echo json_encode(["ERROR" => "Ошибка хеширования пароля"]);
    die;
}

$result = $db->Add('users', ["LOGIN" => $login, "PASSWORD" => $password]);
if((int)$result){
    echo json_encode(["LOGIN" => $login ,"TOKEN" => $password]);
}else{
    echo json_encode(["ERROR" => $result]);
}