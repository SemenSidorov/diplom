<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;
$filter = ["IBLOCK_ID" => 2];

$token = $_GET["TOKEN"];
$id = $_GET["USER_ID"];
$check_user = $db->GetList('users', ["ID" => $id, "TOKEN" => $token], ["ID", "IS_ADMIN", "LAST_AUTH"]);

if($check_user){
    if($check_user[0]["LAST_AUTH"] + 600 < time()) die(json_encode(["ERROR" => "Пользователь не авторизован"]));
    $db->Update('users', $check_user[0]["ID"], ["LAST_AUTH" => time()]);
}else{
    die(json_encode(["ERROR" => "Пользователя с таким токеном не существует"]));
}

if($_GET["DATE_START"] && $_GET["DATE_EXP"]){
    $date_start = strtotime($_GET["DATE_START"]);
    $date_exp = strtotime($_GET["DATE_EXP"]);
    $filter[">=DATE_START"] = $date_start;
    $filter["<=DATE_EXP"] = $date_exp;
}

if($_GET["METHOD"] == "get_for_user"){
    $events = $db->GetList('users_events', ["USER_ID" => (int)$_GET["USER_ID"]]);
    $ar_events_id = [];
    foreach($events as $event){
        $ar_events_id[] = $event["EVENT_ID"];
    }
    $filter["ID"] = $ar_events_id;
}

$result = $db->GetList('elements', $filter, ['ID', 'NAME', 'PREVIEW_PICTURE', 'PREVIEW_TEXT', 'DATE_START', 'DATE_EXP']);
foreach($result as $key => $res){
    $result[$key]["DATE_START_TIMESTAMP"] = $res["DATE_START"];
    $result[$key]["DATE_START"] = date("d-m-Y H:i:s", $res["DATE_START"]);
    $result[$key]["DATE_EXP_TIMESTAMP"] = $res["DATE_EXP"];
    $result[$key]["DATE_EXP"] = date("d-m-Y H:i:s", $res["DATE_EXP"]);
}
echo json_encode($result);