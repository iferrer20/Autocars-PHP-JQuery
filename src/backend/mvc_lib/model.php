<?php

abstract class Model {
    public Database $db;
    public string $controller_name;

    public function __construct() {
        $this->db = new Database();
        $this->controller_name = strtolower(str_replace('Model', '', get_called_class()));
        $this->load_types();
    }
    public function load_types() {
        $type_folder = 'modules/' . $this->controller_name . '/types/';
        if (is_dir($type_folder)) {
            $files = glob($type_folder . '*.php');
            foreach ($files as $filename) {
                include $filename;
            }
        }
    }
}

?>