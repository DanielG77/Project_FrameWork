<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			// return 'hola getInstance bll';
			$this -> dao = search_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			// return 'hola getInstance bll';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_type_game_BLL() {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_type_game($this -> db);
			// return $this -> dao -> select_data_carrusel();
		}

		public function get_brand_game_BLL() {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_brand_game($this -> db);
			// return $this -> dao -> select_data_carrusel();
		}

		public function get_brand_type_BLL($args) {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_brand_type($this -> db, $args);
			// return $this -> dao -> select_data_carrusel();
		}

		//////////////////////////////////////////////////////////////////////////////////////
		public function get_autocomplete_BLL($args) {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_autocomplete($this -> db, $args);
			// return $this -> dao -> select_data_carrusel();
		}
		public function get_autocomplete_type_brand_BLL($args) {
			$auto = isset($args['complete']) ? $args['complete'] : '';
			$brand = isset($args['brand_game']) ? $args['brand_game'] : '';
			$type = isset($args['type_game']) ? $args['type_game'] : '';

			return $this -> dao -> select_data_autocomplete_type_brand($this -> db, $auto, $type, $brand);
		}

		public function get_autocomplete_type_BLL($args) {
			$auto = isset($args['complete']) ? $args['complete'] : '';
			$type = isset($args['type_game']) ? $args['type_game'] : '';
			return $this -> dao -> select_data_autocomplete_type($this -> db, $type, $auto);
		}

		public function get_autocomplete_brand_BLL($args) {
			// $args es un array asociativo: ['complete' => ..., 'brand_game' => ...]
			$auto = isset($args['complete']) ? $args['complete'] : '';
			$brand = isset($args['brand_game']) ? $args['brand_game'] : '';

			return $this->dao->select_data_autocomplete_brand($this->db, $brand, $auto);
		}


	}
?>