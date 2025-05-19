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

		// public function get_products_BLL() {
		// 	//return 'hola get_carrusel_BLL';
		// 	return $this -> dao -> select_data_products($this -> db);
		// 	// return $this -> dao -> select_data_carrusel();
		// }

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