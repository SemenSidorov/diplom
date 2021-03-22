<?require_once($_SERVER['DOCUMENT_ROOT'] . '/BackEnd/class/class.php');
$db = new DB;

// echo phpinfo();

// print_r($db->GetList('test', [], [], [], 2, 1));

// print_r($db->GetById('test', 3, ['NAME', 'ID']));

// print_r($db->GetId('test', ['NAME' => 'BIBA']));

// print_r($db->Update('test', 3, ['NAME' => 'BIBA_BIBA', 'VALUE' => 'lol']));

print_r($db->Add('test', ['NAME' => 'BIBA_BIBA', 'VALUE' => 'lol']));