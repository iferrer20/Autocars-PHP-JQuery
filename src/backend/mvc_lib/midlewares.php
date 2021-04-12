<?php


class Middlewares {
    public static function default($controller) { // Deault middleware

        // Get JSON data from $_POST
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            $data = file_get_contents('php://input');
            if (!$data) { // If no data
                $data = '{}';
            }
            
            $data = json_decode($data, true); // Convert to json
            if (!is_array($data)) {
                throw new BadReqException("Invalid json data");
            }
        } else {
            $data = $_GET;
        }
        Client::$data = $data;
    }
    public static function foo() {
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
