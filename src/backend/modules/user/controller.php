<?php 

class UserController extends Controller {

    public function __construct() {
        parent::__construct(); 
    }
    public function signup_post() {
        $user = new User();
        array_to_obj(Client::$data, $user);
        $user->validate();
        $this->model->insert_user($user);
    }
    public function login_post() {
        $user = new User();
        array_to_obj(Client::$data, $user);
        $user->validate();
    }
    public function list_get() {

    }
    
}


?>
