<?php

class Database {
    public mysqli $conn;

    public function connect() {
        $this->conn = new mysqli("127.0.0.1", "root", "iferrer ??", "autocars");
        if (!$this->conn) {
            die('Error connecting to db ' . mysqli_connect_errno() . '<br>Please contact with the owner');
        }
    }
    public function close() {
        $this->conn->close();
    }
    
    public function __construct() {
        $this->connect();
    }
    public function query(string $query_str, string $types = '', ...$values) {
        if (count($values) == 0 || $types == '') {
            $query = $this->conn->query($query_str);
            $result = (object) [];
            if ($query === false) {
                throw new Exception('Mysqli error: ' . mysqli_error($this->conn));
            } else {
                if (isset($query->insert_id)) {
                    $result->insert_id = $query->insert_id;
                }
                $result->query = $query;
                return $result;
            }
            
        } else {
            $stmt = $this->conn->prepare($query_str);
            if (!$stmt) {
                throw new Exception('Error invalid prepared query');
            }
            $stmt->bind_param($types, ...$values);
            if (!$stmt->execute()) {
                throw new Exception('Error executing query');
            }
            $result = (object) [];
            $result->insert_id = $stmt->insert_id;
            $result->query = $stmt->get_result();
            if ($result === false) {
                throw new Exception('Mysqli error: ' . mysqli_error($this->conn));
            }
            $stmt->close();
            return $result;
        }
        
    }
}

?>