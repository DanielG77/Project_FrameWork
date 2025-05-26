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

        public function select_user_email($db, $email) {
            $sql = "SELECT * FROM `usuario` WHERE email = '$email'";
            $stmt = $db->ejecutar($sql);
            $result = $db->listar($stmt);

            if (empty($result)) {
                return "no_email";
            } else {
                // Devuelve el primer resultado como objeto
                return (object) $result[0];
            }
        }
        
        // SOCIAL LOGIN //////////////////////////////////////////////////////////////////////////////////////////////////////////

        public function select_user($db, $username, $email){

			$sql = "SELECT username
            FROM usuario 
            WHERE username = '$username' OR email = '$email'";

            // return $sql;
            $stmt = $db->ejecutar($sql);
            $result = $db->listar($stmt);
            return $result;
        }

        public function select_user_username($db, $username) {
            $sql = "SELECT * FROM `usuario` WHERE username = '$username'";
            $stmt = $db->ejecutar($sql);
            $result = $db->listar($stmt);

            if (empty($result)) {
                return "not_exist";
            } else {
                // Devuelve el primer resultado como objeto
                return (object) $result[0];
            }
        }

        public function select_social_login($db, $id){

			$sql = "SELECT * FROM users WHERE id='$id'";
            $stmt = $db->ejecutar($sql);

            return $db->listar($stmt);
        }

        public function insert_social_login($db, $username, $email, $avatar){

            $sql ="INSERT INTO usuario (username, password, email, type_user, avatar, token_email, activate) 
                VALUES ('$username', '', '$email', 'client_social', '$avatar', '', 1)";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET activate = 1, token_email= '' WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return "update";
        }

        // RECOVER PASSWORD //////////////////////////////////////////////////////////////////////////////////////////////////////////

        // public function select_recover_password($db, $email){
		// 	$sql = "SELECT `email` FROM `users` WHERE email = '$email' AND password NOT LIKE ('')";
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        // public function update_recover_password($db, $email, $token_email){
		// 	$sql = "UPDATE `users` SET `token_email`= '$token_email' WHERE `email` = '$email'";
        //     $stmt = $db->ejecutar($sql);
        //     return "ok";
        // }

        // public function update_new_passwoord($db, $token_email, $password){
        //     $sql = "UPDATE `users` SET `password`= '$password', `token_email`= '' WHERE `token_email` = '$token_email'";
        //     $stmt = $db->ejecutar($sql);
        //     return "ok";
        // }

        public function select_data_user($db, $username){

			$sql = "SELECT id, username, password, email, user_type, avatar, token_email, activate FROM users WHERE username = '$username'";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    }
?>