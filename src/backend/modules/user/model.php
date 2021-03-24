<?php

class UserModel extends Model {
    public function insert_user(User $user) : void {
        $this->db->query(
            "INSERT INTO users (email, password, firstName, lastName, birthday, gender) VALUES (?, ?, ?, ?, ?, ?)",
            $user->email,
            $user->password,
            $user->firstName,
            $user->lastName,
            $user->birthday,
            $user->gender
        ); 
        $user->id = $result->insert_id;
    }
    public function get_user(User $user) : User {
        $result = $this->db->query(
            "SELECT * FROM users WHERE username=? OR email=? OR id=?",
            $user->username, 
            $user->email, 
            $user->id
        );
        $real_user = new User();
        array_to_obj($real_user, $result->query->fetch_assoc());
        return $real_user;
    }

}

?>
