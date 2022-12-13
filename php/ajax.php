<?php
header('Content-Type: application/json');

$data = $_POST;
$action = $data['action'];

echo json_encode(array(
    'status' => true
));
exit();