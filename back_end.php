<?php
    $data = [];
    $data['time_1'] = $_POST['time_1'];
    $data['time_2'] = $_POST['time_2'];
    $data['insurance'] = $_POST['insurance'];
    $data['first_shoot'] = $_POST['first_shoot'];
    $data['second_shoot'] = $_POST['second_shoot'];
    $data['first_name'] = $_POST['first_name'];
    $data['first_name2'] = $_POST['first_name2'];
    $data['last_name2'] = $_POST['last_name2'];
    $data['tel_number'] = $_POST['tel_number'];
    $data['email'] = $_POST['email'];
    $data['letter'] = $_POST['letter'];
    $data['prefecture'] = $_POST['prefecture'];
    $data['city'] = $_POST['city'];
    $data['address'] = $_POST['address'];
    $data['age'] = $_POST['age'];
    $data['child_rearing'] = $_POST['child_rearing'];
    $data['choose_company'] = $_POST['choose_company'];
    $data['choose_impression'] = $_POST['choose_impression'];
    $data['Individual_application'] = $_POST['Individual_application'];
    echo json_encode($data);
?>
