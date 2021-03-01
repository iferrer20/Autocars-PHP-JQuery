<?php

class CarsModel extends Model {
    public function __construct() {
        parent::__construct();
    }
    // CREATE
    public function insert_car(Car $car) : int {
        //$query = $this->db->conn->prepare("INSERT INTO cars (name, description, price) VALUES (?, ?, ?)");
        // $query->bind_param('sss', $name, $description, $price);
        // $query->execute();
        // $result = $query->get_result();
        // return $result;
        $result = $this->db->query(
            'INSERT INTO cars (name, price, description) VALUES (?, ?, ?)', 
            'sss',
            $car->name, $car->price, $car->description
        );
        return $result->insert_id;
    
    }
    // READ
    public function get_cars(CarList $list_params) : array {
        $result = $this->db->query(
            'SELECT * FROM cars ORDER BY id DESC LIMIT ? OFFSET ?',
            'ii',
            $list_params->limit, ($list_params->page-1)*$list_params->limit
        );
        // $cars = array();
        // while ($row = $result->query->fetch_assoc()) {
        //     $car = new Car();
        //     array_to_obj($row, $car);
        //     array_push($cars, $car);
        // }

        return $result->query->fetch_all(MYSQLI_ASSOC);
    }
    public function get_car(int $id) {
        $result = $this->db->query(
            'SELECT * FROM cars WHERE id=?',
            'i',
            $id
        );
        
        if ($result->query->num_rows > 0) {
            $car = new Car();
            array_to_obj($result->query->fetch_assoc(), $car);
            return $car;
        } else {
            return NULL;
        }
        
        
    } 
    public function search_car(CarSearch $search) {
        $categories = "category";
        if (!empty($search->categories)) {
            $categories = '\'' . join('\', \'', array_map("addslashes", $search->categories)) . '\'';
        }

        $result = $this->db->query(
            "SELECT cars.id, description, cars.name, b.brand, km, price, at, cat.category FROM cars LEFT JOIN brands b ON b.id = cars.id LEFT JOIN car_category cc ON cars.id = cc.car_id LEFT JOIN categories cat ON cc.category_id = cat.id WHERE category IN ($categories) AND price BETWEEN ? AND ? AND km BETWEEN ? AND ? AND at > '1990-01-01 00:00:00' AND b.brand LIKE ? AND (cars.name LIKE CONCAT('%', ?, '%') OR cars.description LIKE CONCAT('%', ?, '%')) LIMIT ? OFFSET ?",
            'iiiisssii',
            $search->min_price, $search->max_price,
            $search->min_km, $search->max_km,
            $search->brand,
            $search->text, $search->text,
            $search->limit, ($search->page-1)*$search->limit
        );

        return $result->query->fetch_all(MYSQLI_ASSOC);
    }
    public function search_car_count(CarSearch $search) {
        $categories = "category";
        if (!empty($search->categories)) {
            $categories = '\'' . join('\', \'', array_map("addslashes", $search->categories)) . '\'';
        }

        $result = $this->db->query(
            "SELECT COUNT(cars.id) as car_count FROM cars LEFT JOIN brands b ON b.id = cars.id LEFT JOIN car_category cc ON cars.id = cc.car_id LEFT JOIN categories cat ON cc.category_id = cat.id WHERE category IN ($categories) AND price BETWEEN ? AND ? AND km BETWEEN ? AND ? AND at > '1990-01-01 00:00:00' AND b.brand LIKE ? AND (cars.name LIKE CONCAT('%', ?, '%') OR cars.description LIKE CONCAT('%', ?, '%'))",
            'iiiisss',
            $search->min_price, $search->max_price,
            $search->min_km, $search->max_km,
            $search->brand,
            $search->text, $search->text
        );

        return $result->query->fetch_all(MYSQLI_ASSOC)[0]["car_count"];
    }

    // UPDATE
    public function update_car(Car $car) {
        $result = $this->db->query(
            'UPDATE cars SET name=?, description=?, price=? WHERE id=?',
            'ssii',
            $car->name, $car->description, $car->price, $car->id
        );
    }
    // DELETE
    public function delete_car(int $id) {
        $this->db->query(
            'DELETE FROM cars WHERE id=?',
            'i',
            $id
        );
    }
    public function trucate_cars_table() {
        $this->db->query('TRUNCATE TABLE cars');
    }

    // OTHER
    public function get_car_count() : int {
        $result = $this->db->query('SELECT COUNT(*) total_cars FROM cars')->query->fetch_assoc()['total_cars'];
        return intval($result);
    }
}


?>