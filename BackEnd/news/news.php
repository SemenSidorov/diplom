<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;
$count_news = 10;
$top_news = 0;
$pagen = (int)$_GET["PAGEN"];

if((int)$_GET["USER_ID"]){
    $db->Update('users', (int)$_GET["USER_ID"], ["LAST_AUTH" => time()]);
}

if($pagen) $top_news = $count_news * ($pagen - 1);
$result = $db->GetList('elements', ["IBLOCK_ID" => 1], ['ID', 'NAME', 'PREVIEW_PICTURE', 'PREVIEW_TEXT'], [], $top_news, $count_news);
$count = $db->Count('elements', ["IBLOCK_ID" => 1]);
echo json_encode(["values" => $result, "count_news_all" => $count, "this_page" => ($pagen ? $pagen : 1)]);