<?php

class CarSearch {
    public string $text = '';

    public function __construct() {
    }
    public function validate() : void {
        if (strlen($this->text) > 100) {
            throw new BadReqException('Search too long');
        }
        if (preg_match("/([^A-Za-z0-9_-]\s)/", $this->text)) {
            throw new BadReqException('Invalid characters');
        }
    }
}



?>