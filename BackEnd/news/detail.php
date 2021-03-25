<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;
$id = (int)$_GET["ID"];

$result = $db->GetByID('elements', $id, ["NAME", "DETAIL_TEXT"]);
$pictures = $db->GetList('properties', ["ELEMENT_ID" => $id, "NAME" => "ADD_PICTURES"]);
if(is_array($pictures)) $result["ADD_PICTURES"] = $pictures;
echo json_encode($result);