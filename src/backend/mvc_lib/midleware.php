<?php


class Middlewares {
    static function foo() {
        echo "testing";
    }
}

// function get_json_data() {
//     if ($_SERVER['REQUEST_METHOD'] != 'GET') {
//         $data = json_decode(file_get_contents('php://input'), true);

//         if (!is_array($data)) {
//             throw new BadReqException("Invalid json data");
//         }
//         return $data;
//     } else {
//         return $_GET;
//     }
// }
// function get_ipaddr() {
//     return $_SERVER['REMOTE_ADDR'];
// }



?>
