<?php
	class auth_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = auth_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
			if (!isset($args['email'], $args['username'], $args['passworda'])) {
				return "error_args";
			}

			try {
				$check = $this->dao->select_email($this->db, $args['email']);
			} catch (Exception $e) {
				return "error_email";
			}

			if ($check !== "no_email") {
				return "email_exist";
			}

			try {
				$check = $this->dao->select_username($this->db, $args['username']);
			} catch (Exception $e) {
				return "error_username";
			}

			if ($check !== "no_username") {
				return "username_exist";
			}

			// Si todo está bien, continuamos con el registro
			$token_email = common::generate_Token_secure(20); // generar token

			try {
				// Insertar usuario (modifica tu DAO para aceptar el token)
				$rdo = $this->dao->insert_user($this->db, $args['username'], $args['email'], $args['passworda'], $token_email);
			} catch (Exception $e) {
				return "error_user";
			}

			if ($rdo === 'ok') {
				// Preparar y enviar el email de validación
				// return "ok";
				$message = [
					'type' => 'validate',
					'token' => $token_email,
					'toEmail' => $args['email']
				];

				// Enviar correo y verificar estado
				$email_status = mail::send_email($message);

				if ($email_status['success']) {
					return "ok";
				} else {
					return "email_error";
				}
			} else {
				return "error_user_ok";
			}
		}

		public function get_login_BLL($args) {
			session_start();
			if (!isset($args['username_log'], $args['password_log'])) {
				return "error_args";
			}

			try {
				$user = $this->dao->select_user_email($this->db, $args['username_log']);
			} catch (Exception $e) {
				return "error_user";
			}

			if ($user === "no_email" || empty($user)) {
				try {
					$user = $this->dao->select_user_username($this->db, $args['username_log']);
				} catch (Exception $e) {
					return "error_user";
				}
				if ($user === "error_user" || empty($user)) {
					return "error_user";
				}
			}

			if (isset($user->activate) && $user->activate == 1) {
                    return "user_inactivo";
                }

			if (password_verify($args['password_log'], $user->password)) {
				try {
					$token = middleware::create_token($user->username);
					$_SESSION['username'] = $user->username;
					$_SESSION['tiempo'] = time();
				} catch (Exception $e) {
					return "error_token";
				}
				return $token;
			} else {
				return "error_passwd";
			}
		}

		public function get_user_BLL($token) {
			session_start();
			// Decodifica correctamente el token JWT, sea string o array
			if (is_array($token) && isset($token['token'])) {
				$token_value = $token['token'];
			} else {
				$token_value = $token;
			}
			$username = middleware::decode_username($token_value);
			return $this->dao->select_user_username($this->db, $username);
			// return $username;
		}

		public function get_logout_BLL() {
			session_start();
            unset($_SESSION['username']);
            unset($_SESSION['tiempo']);
            session_destroy();
            return 'Done';
        }

		public function get_verify_email_BLL($args) {
			// if($this -> dao -> select_verify_email($this->db, $args)){
			// 	$this -> dao -> update_verify_email($this->db, $args);
				return $args;
			// } else {
				// return 'fail';
			// }
		}

		// SOCIAL LOGIN///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		public function get_social_login_BLL($arguments) {
			session_start();
			if (!empty($this->dao->select_user($this->db, $arguments['username'], $arguments['email']))) {
				$user = $this->dao->select_user($this->db, $arguments['username'], $arguments['email']);
				// Crear el JWT usando la clase jwt
				$jwt = new jwt();
				$jwt_ini = parse_ini_file(MODEL_PATH . "jwt.ini");
				$header = $jwt_ini['header'];
				$secret = $jwt_ini['secret'];
				$payload = json_encode([
					'iat' => time(),
					'exp' => time() + 3600,
					'name' => $user[0]['username']
				]);
				$token = $jwt->encode($header, $payload, $secret);
				$_SESSION['username'] = $user[0]['username'];
				$_SESSION['tiempo'] = time();
				return $token;
			} else {
				$this->dao->insert_social_login($this->db, $arguments['username'], $arguments['email'], $arguments['avatar']);
				$user = $this->dao->select_user($this->db, $arguments['username'], $arguments['email']);
				// Crear el JWT usando la clase jwt
				$jwt = new jwt();
				$jwt_ini = parse_ini_file(MODEL_PATH . "jwt.ini");
				$header = $jwt_ini['header'];
				$secret = $jwt_ini['secret'];
				$payload = json_encode([
					'iat' => time(),
					'exp' => time() + 3600,
					'name' => $user[0]['username']
				]);
				$token = $jwt->encode($header, $payload, $secret);
				$_SESSION['username'] = $user[0]['username'];
				$_SESSION['tiempo'] = time();
				return $token;
			}
		}

		// RECOVER PASSWORD //////////////////////////////////////////////////////////////////////////////////////////////////////////

		public function get_recover_email_BBL($args) {
			// No es necesario session_start() aquí, no se usa la sesión
			$user = $this -> dao -> select_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);

			if (!empty($user)) {
				$this -> dao -> update_recover_password($this->db, $args, $token);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return;  
				}   
            }else{
                return 'error';
            }
		}

		public function get_verify_token_BLL($args) {
			// No es necesario session_start() aquí, no se usa la sesión
			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			// No es necesario session_start() aquí, no se usa la sesión
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

		public function get_data_user_BLL($args) {
			session_start();
			$token = explode('"', $args);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> select_data_user($this->db, $decode);
		}

		// ACTIVITY //////////////////////////////////////////////////////////////////////////////////////////////////////////

		public function get_controluser_BLL($args) {
			session_start();
			$decode = middleware::decode_username($args); // <-- decodifica directamente el token
			$user = $this -> dao -> select_user($this->db, $decode, "");

			// Valida que la sesión esté activa y que el usuario en sesión coincida con el del token
			if (!isset($_SESSION['username']) || empty($user) || $_SESSION['username'] !== $user[0]['username']) {
				return 'not_match';
			}
			return 'match';
		}

		public function get_activity_BLL() {
			session_start();
            if (!isset($_SESSION["tiempo"])) {  
				return "inactivo";
			} else {  
				if((time() - $_SESSION["tiempo"]) >= 1800) {  
						return "inactivo";
				}else{
					return (time() - $_SESSION["tiempo"]);
				}
			}
		}
		
		public function get_token_expires_BLL($args) {
			// No es necesario session_start() aquí, no se usa la sesión
			$token = explode('"', $args);
			$decode = middleware::decode_exp($token[1]);
			
            if(time() >= $decode) {  
				return "inactivo"; 
			} else{
				return "activo";
			}
		}

		public function get_refresh_token_BLL($args) {
			session_start();
			$token = explode('"', $args);
			$void_email = "";
			$decode = middleware::decode_username($token[1]);
			$user = $this->dao->select_user($this->db, $decode, $void_email);

			// Crear el JWT usando la clase jwt
			$jwt = new jwt();
			$jwt_ini = parse_ini_file(MODEL_PATH . "jwt.ini");
			$header = $jwt_ini['header'];
			$secret = $jwt_ini['secret'];
			$payload = json_encode([
				'iat' => time(),
				'exp' => time() + 3600,
				'name' => $user[0]['username']
			]);
			$new_token = $jwt->encode($header, $payload, $secret);

            return $new_token;
		}

		public function get_firebase_config_BLL() {
			$firebase_ini = parse_ini_file(MODEL_PATH . "firebase.ini", true);
			if (isset($firebase_ini['firebase'])) {
				return [
					'apiKey' => $firebase_ini['firebase']['apiKey'],
					'authDomain' => $firebase_ini['firebase']['authDomain'],
					'projectId' => $firebase_ini['firebase']['projectId'],
					'storageBucket' => $firebase_ini['firebase']['storageBucket'],
					'messagingSenderId' => $firebase_ini['firebase']['messagingSenderId'],
					'measurementId' => $firebase_ini['firebase']['measurementId']
				];
			} else {
				return ['error' => 'Firebase config not found'];
			}
		}

	}
?>