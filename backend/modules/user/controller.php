<?php 

class UserController extends Controller {

    public function __construct() {
        parent::__construct(); 
        $this->view->header = 'user/views/header';
    }
    public function signup_get() {
        $this->render('signup');
    }
    public function signup_post() {
        $user = new User();
        array_to_obj($_POST, $user);
        if ($user->validate()) {

        } else {
            http_response_code(400);
            $this->render('signup');
        }
    }
    public function login_get() {
        $this->render('login');
    }
    
    public function list_get() {

    }
    
}


?>
