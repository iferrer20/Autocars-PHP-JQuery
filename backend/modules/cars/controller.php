<?php

class CarsController extends Controller {
    public string $default = 'search'; // Default action

    // public array $guest_actions = [
    //     'read',
    //     'list'
    // ];
    // public array $admin_actions = [
    //     '*'
    // ];
    // public array $user_actions = [
    //     'read',
    //     'list'
    // ];
    
    public function __construct() {
        parent::__construct(); 
    }
    // public function list_get() {
    //     res($this->model->get_cars());
    // }
    // public function list_post() {
        
    //     $list = new CarList();
    //     array_to_obj(Client::$data, $list);
    //     $list->validate();

    //     $cars = $this->model->get_cars($list);

    //     $car_count = $this->model->get_car_count();
    //     $pages = $car_count/$list->limit;
    //     $pages += is_float($pages) ? 1 : 0;
    //     $pages = intval($pages);

    //     res(array(
    //         "cars" => $cars,
    //         "pages" => $pages
    //     ));
        
    // }
    public function categories_get() {
        //var_dump($this->model->get_categories());
        res($this->model->get_categories());
    }

    public function search_post() {
        
        $search = new CarSearch();
        array_to_obj(Client::$data, $search);
        $search->validate();

        $cars = $this->model->search_car($search);
        $car_count = $this->model->search_car_count($search);
        $pages = $car_count/$search->limit;
        $pages += is_float($pages) ? 1 : 0;
        $pages = intval($pages);

        res(array(
            'cars' => $cars,
            'pages' => $pages
        ));
        
    }
    public function read_get() {
        $car = $this->model->get_car(Client::$uri[2]);
        if ($car) {
            res($car);
        } else {
            notfound('Car ' . Client::$uri[2]);
        }
    }
    public function create_post() {
        $car = new Car();
        array_to_obj($_POST, $car, true);

        $car->validate();
        $id = $this->model->insert_car($car);

        save_image('img', 'public/img/cars/' . $id . '.jpg');
    }
    public function delete_post() {
        $car_id = Client::$data["id"];
        $car = $this->model->get_car($car_id);
        if ($car) {
            $this->model->delete_car($car["id"]);
            remove_file('../frontend/img/cars/' . $car["id"] . '.jpg');
        } else {
            notfound('The car ' . $car_id);
        }
        
    }
    public function update_post() {
        $car = new Car();
        array_to_obj(Client::$data, $car);

        $car->validate();
        $this->model->update_car($car);
        if (is_image('img')) {
            $filepath = 'public/img/cars/' . $car->id . '.jpg';
            remove_file($filepath);
            save_image('img', $filepath);
        }
    }
    public function truncate_post() {
        if ($_POST['confirm'] == 'true') {
            $this->model->trucate_cars_table();
        }
    }
}

?>