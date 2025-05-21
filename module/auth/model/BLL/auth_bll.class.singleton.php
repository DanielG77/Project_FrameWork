<?php
	class auth_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			// return 'hola getInstance bll';
			$this -> dao = auth_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			// return 'hola getInstance bll';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
			// Validar que los campos existen
			if (!isset($args['email'], $args['username'], $args['passworda'])) {
				return "error_args";
			}

			// EMAIL
			try {
				$check = $this->dao->select_email($this->db, $args['email']);
			} catch (Exception $e) {
				return "error_email";
			}

			if ($check === "no_email") {
				$check_email = true;
			} else {
				return "email_exist";
			}

			// USERNAME
			try {
				$check = $this->dao->select_username($this->db, $args['username']);
			} catch (Exception $e) {
				return "error_username";
			}

			if ($check === "no_username") {
				$check_username = true;
			} else {
				return "username_exist";
			}

			// REGISTRO
			if ($check_email === true && $check_username === true) {
				try {
					$rdo = $this->dao->insert_user($this->db, $args['username'], $args['email'], $args['passworda']);
				} catch (Exception $e) {
					return "error_user";
				}
				if ($rdo === 'ok') {
					return "ok";
				} else {
					return "error_user_ok";
				}
			} else {
				return "error_general";
			}
		}

		public function get_login_BLL($args) {
			// Validar que los campos existen
			if (!isset($args['username_log'], $args['password_log'])) {
				return "error_args";
			}

			// Primero intenta buscar por email
			try {
				$user = $this->dao->select_user_email($this->db, $args['username_log']);
			} catch (Exception $e) {
				return "error_user";
			}

			// Si no se encuentra el email, intenta buscar por username
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

			// PASSWORD
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

		// public function get_product_filters_BLL($filter) {
		// 	return $this -> dao -> select_data_product_filters($this -> db, $filter);
		// }

		// public function get_details_BLL($id) {
		// 	return $this -> dao -> select_data_details($this -> db, $id);
		// }

		// public function get_count_paginacion_BLL() {
		// 	return $this -> dao -> select_data_count_paginacion($this -> db);
		// }

		// public function get_count_paginacion_filters_BLL($filter) {
		// 	return $this -> dao -> select_data_count_paginacion_filters($this -> db, $filter);
		// }
	}
?>