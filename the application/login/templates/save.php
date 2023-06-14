<?php
    if(!empty($_POST['data'])){
    $data = $_POST['data'];
    $fname = "db.csv";

    $file = fopen($fname, 'w');
    fwrite($file, $data);
    fclose($file);
    }
?>    