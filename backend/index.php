<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$folders_to_include = array('mvc_lib', 'utils', 'exceptions');
foreach ($folders_to_include as &$folder) { 
    $files = glob($folder . '/*.php');
    foreach ($files as &$file) {
        include_once $file;
    }
}

$app = new App();

?>