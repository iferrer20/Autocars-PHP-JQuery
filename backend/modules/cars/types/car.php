<?php

class Car {
    public int $id;
    public int $price = 1000;
    public string $name = '';
    public string $description = '';
    public string $brand;
    public string $category;
    public int $km;
    public string $at;

    public function __construct () {
    }

    public function validate() {

        if (Client::$uri[1] != 'update_post' && !is_image('img')) {
            $err = 'An image required';
        }
        if (!isset($this->name) || $this->name == '') {
            $err = 'Please insert a name';
        } else if (strlen($this->name) > 20) {
            $err = 'Name too long';
        } else if(strlen($this->name) < 4) {
            $err = 'Name too short';
        }
        if (!isset($this->description) || $this->description == '') {
            $err = 'Please insert a description';
        } else if (strlen($this->description) > 1000) {
            $err = 'Description too long';
        } else if(strlen($this->description) < 4) {
            $err = 'Description too short';
        }
        if (!isset($this->price)) {
            $err = 'Please set a price';
        } else if ($this->price > 1000000) {
            $err = 'Price too high';
        } else if($this->price < 200) {
            $err = 'Price too low';
        }
        if (isset($err)) {
            throw new BadReqException($err);
        }
    }
}

?>