<?php

class UserModel extends Model {
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
    public function get_cars() : array {
        $result = $this->db->query(
            'SELECT * FROM cars'
        );
        $cars = array();
        while ($row = $result->query->fetch_assoc()) {
            $car = new Car();
            array_to_obj($row, $car);
            array_push($cars, $car);
        }

        return $cars;
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
}




?>