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
            $stmt = $db->ejecutar($sql);
            $result = $db->listar($stmt);

            if (empty($result)) {
                return "no_email";
            } else {
                return "email_exist";
            }
        }

        public function select_username($db, $username) {
            $sql = "SELECT username FROM usuario WHERE username='$username'";
            $stmt = $db->ejecutar($sql);
            $result = $db->listar($stmt);

            if (empty($result)) {
                return "no_username";
            } else {
                return "username_exist";
            }
        }
        
        public function insert_user($db, $username, $email, $password) {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $avatar_hash = md5(strtolower(trim($email)));
            $avatar = "https://i.pravatar.cc/500?u=$avatar_hash";

            // Sentencia preparada, pero ejecutada a través de tu wrapper
            $sql = "INSERT INTO usuario (username, email, password, avatar) VALUES ('$username', ' $email', '$hashed_password', '$avatar')";

            $stmt = $db->ejecutar($sql);

            // Suponemos que $stmt será true/false según éxito o error
            if ($stmt) {
                return 'ok';
            } else {
                error_log("Error en insert_user: " . $db->error);
                return 'error';
            }
        }

        public function select_user($db, $username, $email, $password) {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $avatar_hash = md5(strtolower(trim($email)));
            $avatar = "https://i.pravatar.cc/500?u=$avatar_hash";

            // Sentencia preparada, pero ejecutada a través de tu wrapper
            $sql = "INSERT INTO usuario (username, email, password, avatar) VALUES ('$username', ' $email', '$hashed_password', '$avatar')";

            $stmt = $db->ejecutar($sql);

            // Suponemos que $stmt será true/false según éxito o error
            if ($stmt) {
                return 'ok';
            } else {
                error_log("Error en insert_user: " . $db->error);
                return 'error';
            }
        }

    }
?>