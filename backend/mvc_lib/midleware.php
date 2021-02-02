<?php

function get_json_data() {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!is_array($data)) {
        throw new BadReqException("Invalid json data");
    }
    return $data;
}
function get_ipaddr() {
    return $_SERVER['REMOTE_ADDR'];
}


?>