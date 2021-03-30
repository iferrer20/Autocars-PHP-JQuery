<?php

class App {

    public function __construct() {
        global $res;

        // uri = /api/cars/search -> ['cars','search_post']

        $uri = array_key_exists('uri', $_GET) ? htmlentities(str_replace("/api/", "", $_GET['uri'])) : 'cars/list';  // Prevent xss
        $uri = explode('/', rtrim($uri, '/'));  // Split uri by 

        $this->uri = $uri;

        $controller_name = $uri[0] ?? NULL;
        $action_name = $uri[1] ?? NULL;

        if ($controller = $this->load_controller($controller_name)) {
            if ($func = $this->load_action($controller, $action_name)) {
                $this->call_middlewares($controller, $func);
                $controller->{$func}();
            } else {
                notfound($action_name);
            }
        } else {
            notfound($controller_name);
        }        
    } 

    private function load_controller($module_name) {
        $file_controller = 'modules/' . $module_name . '/controller.php';
        if (file_exists($file_controller)) { 
            require_once $file_controller;
            $class_cl_name = $module_name . 'Controller';
            $controller = new $class_cl_name;
            return $controller;
            // $controller->end(); // End with controller

        } 
    }

    private function load_action($controller, $action_name) {
        $function_name = $action_name . '_' . strtolower(get_method());
        if (method_exists($controller, $function_name)) {
            return $function_name;
        } 
    }

    private function call_middlewares($controller, $func) {

        $reflection_class = new ReflectionClass(get_class($controller));
        $reflection_method = new ReflectionMethod(get_class($controller), $func);
        $attributes = array_merge(
            $reflection_method->getAttributes(), 
            $reflection_class->getAttributes()
        );

        foreach ($attributes as $attribute) {
            switch ($attribute->getName()) {
                case 'middlewares':
                    foreach ($attribute->getArguments() as $argument) {
                        if (method_exists('Middlewares', $argument)) {
                            Middlewares::{$argument}();
                        }
                    }
                    break;
            }
        }
    }
}
?>
