<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;
$count_news = 10;
$top_news = 0;
$pagen = (int)$_GET["PAGEN"];<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token], ["ID", "IS_ADMIN", "LAST_AUTH"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    if(!$check_user[0]["IS_ADMIN"]) die(json_encode(["ERROR" => "Не админ"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}else{
    die(json_encode(["ERROR" => "Пользователя с таким токеном не существует"]));
}

if($pagen) $top_news = $count_news * ($pagen - 1);
$result = $db->GetList('users_events', [], ['USER_ID']);
$ids = [];
foreach($result as $usr){
    $ids[] = $usr["USER_ID"];
}
$result = $db->GetList('users', ['ID' => $ids], ['ID', 'NAME'], [], $top_news, $count_news);
$count = $db->Count('users_events');
echo json_encode(["values" => $result, "count_news_all" => $count, "this_page" => ($pagen ? $pagen : 1)]);