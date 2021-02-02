<?php

abstract class Controller {
    public string $type;
    public $model; // No type (herency)
    public $uri;

    public function __construct() {
        global $uri;
        $this->uri = $uri;
        $this->type = strtolower(str_replace('Controller', '', get_called_class()));
        $this->load_model();
    }
    public function load_model() {
        $file_model = 'modules/' . $this->type . '/model.php';
        $model_name = $this->type.'model';
        
        if (file_exists($file_model)) {
            include $file_model;
            if (class_exists($model_name)) {
                $this->model = new $model_name;
            }
        }
    }
    public function action_notfound() {
        new NotFoundController('action ' . $this->uri[2]);
    }
    public function notfound($str) {
        new NotFoundController($str);
    }
    public function render(string $name) {
        $this->view->renderAll($name);
    }
    public function end() {
        $this->model->db->close();
    }
}

?>