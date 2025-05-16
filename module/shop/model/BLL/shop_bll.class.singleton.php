<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			// return 'hola getInstance bll';
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			// return 'hola getInstance bll';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_products_BLL() {
			//return 'hola get_carrusel_BLL';
			return $this -> dao -> select_data_products($this -> db);
			// return $this -> dao -> select_data_carrusel();
		}

		public function get_filters_BLL() {
			return $this -> dao -> select_data_filters($this -> db);
		}

		public function get_product_filters_BLL() {
			return $this -> dao -> select_data_product_filters($this -> db, $_POST['filtro_shop']);
		}

		// public function get_city_BLL() {
		// 	return $this -> dao -> select_data_city($this -> db);
		// }

		// public function get_popular_BLL() {
		// 	return $this -> dao -> select_data_popular($this -> db);
		// }

		// public function get_rating_BLL() {
		// 	return $this -> dao -> select_data_rating($this -> db);
		// }
	}
?>