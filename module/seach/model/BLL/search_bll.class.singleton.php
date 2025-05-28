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

		public function get_brand_category() {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_brand_category($this -> db);
			// return $this -> dao -> select_data_carrusel();
		}

		public function get_autocomplete_BLL() {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_autocomplete($this -> db);
			// return $this -> dao -> select_data_carrusel();
		}
		// public function get_filters_BLL() {
		// 	return $this -> dao -> select_data_filters($this -> db);
		// }

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