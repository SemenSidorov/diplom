<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

// echo phpinfo();

print_r(
    $result = $db->GetList('elements', ["IBLOCK_ID" => 1], ['ID', 'NAME', 'PREVIEW_PICTURE', 'PREVIEW_TEXT', 'DATE_START'], ["DATE_START" => "DESC"]));

// print_r($db->GetById('test', 3, ['NAME', 'ID']));

// print_r($db->GetId('test', ['NAME' => 'BIBA']));

// print_r($db->Update('test', 3, ['NAME' => 'BIBA_BIBA', 'VALUE' => 'lol']));

// print_r($db->Add('test', ['NAME' => 'BIBA_BIBA', 'VALUE' => 'lol']));

// print_r($db->Remove('test', 3));