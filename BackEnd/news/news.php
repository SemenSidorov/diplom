<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

$count_news = 10;
$top_news = 0;
$pagen = (int)$_GET["PAGEN"];

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token], ["ID", "IS_ADMIN", "LAST_AUTH"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}

if($pagen) $top_news = $count_news * ($pagen - 1);
$result = $db->GetList('elements', ["IBLOCK_ID" => 1], ['ID', 'NAME', 'PREVIEW_PICTURE', 'PREVIEW_TEXT', 'DATE_START'], ["DATE_START" => "DESC"], $top_news, $count_news);
$count = $db->Count('elements', ["IBLOCK_ID" => 1]);
echo json_encode(["values" => $result, "count_news_all" => $count, "this_page" => ($pagen ? $pagen : 1)]);