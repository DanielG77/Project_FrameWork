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

		public function get_products_BLL($arguments) {
			$items_page = $arguments['items_page'];
			$total_prod = $arguments['total_prod'];
			// $filtro_shop = isset($arguments['filtro_shop']) ? $arguments['filtro_shop'] : null;
			// return $total_prod;
			return $this->dao->select_data_products($this->db, $total_prod, $items_page);
		}

		public function get_filters_BLL() {
			return $this -> dao -> select_data_filters($this -> db);
		}

		public function get_product_filters_BLL($arguments) {
			$items_page = $arguments['items_page'];
			$total_prod = $arguments['total_prod'];
			$filters = $arguments['filters'];
			// $items_page = $arguments;
			// $filtro_shop = isset($arguments['filtro_shop']) ? $arguments['filtro_shop'] : null;
			// return $filters;
			return $this -> dao -> select_data_product_filters($this -> db, $total_prod, $items_page, $filters);
		}

		public function get_details_BLL($id) {
			return $this -> dao -> select_data_details($this -> db, $id);
		}

		public function get_count_paginacion_BLL() {
			return $this -> dao -> select_data_count_paginacion($this -> db);
		}

		public function get_count_paginacion_filters_BLL($filter) {
			return $this -> dao -> select_data_count_paginacion_filters($this -> db, $filter);
		}

		public function get_more_visited_BLL($id) {
			// return $id;
			return $this -> dao -> update_data_visited($this -> db, $id);
		}

		public function get_games_related_BLL($args) {
			return $this -> dao -> select_data_games_related($this -> db, $args['id_prod'], $args['items'], $args['loaded'], $args['type']);
		}

		public function get_count_related_BLL($args) {
			return $this -> dao -> select_data_count_related($this -> db, $args['id_prod'], $args['type_game']);
		}

		public function get_control_likes_BLL($args) {
			$token = $args['token'];
			$decode = middleware::decode_username($token);
			// return $decode;

			if ($this -> dao -> select_likes($this->db, $args['id'], $decode)) {
				return $this -> dao -> delete_likes($this->db, $args['id'], $decode);
			}
			return $this -> dao -> insert_likes($this->db, $args['id'], $decode);
		}

		public function get_load_likes_BLL($args) {
			// $token = $args['token'];
			$decode = middleware::decode_username(get_token: $args);
			// return $decode;

			return $this -> dao -> select_load_likes($this->db, $decode);
		}

		public function get_load_likes_details_BLL($args) {
			// $token = $args['token'];
			$decode = middleware::decode_username(get_token: $args['token']);
			// return $decode;

			return $this -> dao -> select_load_likes_details($this->db, $decode, $args['id']);
		}
	}
?>