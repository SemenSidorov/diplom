<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;
$filter = ["IBLOCK_ID" => 2];

if($_GET["DATE_START"]){
    $date_start = strtotime($_GET["DATE_START"]);
    $date_exp = strtotime($_GET["DATE_START"]) + date('t')*24*60*60;
    $filter[">=DATE_START"] = $date_exp;
    $filter["<=DATE_EXP"] = $date_start;
}

if((int)$_GET["USER_ID"]){
    $db->Update('users', (int)$_GET["USER_ID"], ["LAST_AUTH" => time()]);
    $events = $db->GetList('users_events', ["USER_ID" => (int)$_GET["USER_ID"]]);
    $ar_events_id = [];
    foreach($events as $event){
        $ar_events_id[] = $event["EVENT_ID"];
    }
    $filter["ID"] = $ar_events_id;
}

$result = $db->GetList('elements', $filter, ['NAME', 'PREVIEW_PICTURE', 'PREVIEW_TEXT', 'DATE_START', 'DATE_EXP']);
foreach($result as $key => $res){
    $result[$key]["DATE_START_TIMESTAMP"] = $res["DATE_START"];
    $result[$key]["DATE_START"] = date("d-m-Y H:i:s", $res["DATE_START"]);
    $result[$key]["DATE_EXP_TIMESTAMP"] = $res["DATE_EXP"];
    $result[$key]["DATE_EXP"] = date("d-m-Y H:i:s", $res["DATE_EXP"]);
}
echo json_encode($result);