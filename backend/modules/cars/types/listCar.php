
<?php

class ListCar {
    public int $page = 0;
    public int $limit = 9;
    public int $after_id = 0;
    public int $cars_count = 0;

    public function __construct($cars_count) {
        $this->cars_count = $cars_count;
    }
    public function validate() : void {
        if ($this->limit > 81) {
            throw new BadReqException('Max limit');
        }
    }
}


?>