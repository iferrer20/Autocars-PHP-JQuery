<?php

class CarSearch {
    public string $text = '';
    public array $categories = array();
    public int $min_price = 0;
    public int $max_price = 10000;
    public int $min_km = 0;
    public int $max_km = 1000000;
    public string $brand = '%%';
    public int $page = 1;
    public int $limit = 9;

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