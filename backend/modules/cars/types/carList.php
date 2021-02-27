
<?php

class CarList {
    public int $page = 1;
    public int $limit = 9;

    public function __construct() {
    }
    public function validate() : void {
        if ($this->limit > 81) {
            throw new BadReqException('Max limit');
        }
        if ($this->page < 1) {
            throw new BadReqException('Invalid page');
        }
        if ($this->page > 1000) {
            throw new BadReqException('Max page');
        } 
        
    }
}


?>