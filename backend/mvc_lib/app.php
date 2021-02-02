<?php

class App {
    public function __construct() {
        global $res;

        $uri = array_key_exists('uri', $_GET) ? htmlentities(str_replace("/api/", "", $_GET['uri'])) : 'cars/list';  // Prevent xss
        $uri = explode('/', rtrim($uri, '/'));  // Split uri by 

        $notfound_controller = 'modules/notfound/controller.php';
        $error_controller = 'modules/error/controller.php';
        require_once $notfound_controller;

        $file_controller = 'modules/' . $uri[0] . '/controller.php';
        if (file_exists($file_controller)) { 
            require_once $file_controller;
            $class_cl_name = $uri[0] . 'Controller';
            $controller = new $class_cl_name;
            $method = get_method();
            
            if (isset($uri[1]) || property_exists($controller, 'default')) {
                $uri[1] = isset($uri[1]) ? $uri[1] : $controller->default;
                $uri[1] .= '_' . strtolower(get_method());

                if (method_exists($controller, $uri[1])) {
                    try {
                        // Midlewares
                        Client::$data = get_json_data();
                        Client::$ip_addr = get_ipaddr();
                        Client::$uri = $uri;

                        $controller->{$uri[1]}();
                        if (!$res) { // If controller haven't responsed, respond with 200 OK
                            ok();
                        }
                    } catch (BadReqException $e) {
                        error($e->getMessage());
                    } catch (Exception $e) {
                        sys_error($e);
                    } 
                    
                } else {
                    $controller->action_notfound();
                }
            } else {
                notfound($uri[0] . ' not found');
            }
            
            $controller->end(); // End with controller

        } else {
            notfound($uri[0]);
        }
    } 
}
?>

