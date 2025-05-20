<?php
    class auth_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            //return 'hola getInstance dao';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        public function select_email($db, $email) {
            $sql = "SELECT email FROM usuario WHERE email='$email'";
            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
        public function select_username($db, $username) {
            $sql = "SELECT username FROM usuario WHERE username='$username'";
            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
        
        public function insert_user($db, $username, $email, $password) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $avatar_hash = md5(strtolower(trim($email)));
        $avatar = "https://i.pravatar.cc/500?u=$avatar_hash";
        
        // IMPORTANTE: Usa sentencias preparadas si tu clase $db lo permite
        $sql = "INSERT INTO usuario (username, email, password, avatar) VALUES (?, ?, ?, ?)";
        
        $stmt = $db->ejecutar($sql, [$username, $email, $hashed_password, $avatar]);
        
        if ($stmt) {
            return 'ok';
        } else {
            error_log("Error en insert_user: " . $db->error);
            return 'error';
        }
}
    }
?>