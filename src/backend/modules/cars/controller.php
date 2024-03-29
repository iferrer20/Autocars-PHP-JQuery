<?php

class CarsController extends Controller {

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
    public function brands_get() {
        res($this->model->get_brands());
    }
    #[middlewares('foo', 'bar', 'test'), test('')]
    public function search_post(CarSearch $search) {
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
    public function create_post() {
        $car = new Car();
        array_to_obj($_POST, $car, true);

        $car->validate();
        $id = $this->model->insert_car($car);

        save_image('img', 'public/img/cars/' . $id . '.jpg');
    }
    public function delete_post(int $id) {
        $car = $this->model->get_car($id);
        if ($car) {
            $this->model->delete_car($car["id"]);
            remove_file('/var/www/html/img/cars/' . $car["id"] . '.jpg');
        } else {
            notfound('The car ' . $id);
        }
    }
    public function update_post(Car $car) {
        $this->model->update_car($car);
        if (is_image('img')) {
            $filepath = 'public/img/cars/' . $car->id . '.jpg';
            remove_file($filepath);
            save_image('img', $filepath);
        }
    }
    /*public function truncate_post() {
        if ($_POST['confirm'] == 'true') {
            $this->model->trucate_cars_table();
        }
    }*/
}

?>
