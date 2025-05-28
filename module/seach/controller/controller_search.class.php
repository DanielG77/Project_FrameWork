<?php
    class controller_search {
        static $_instance;

         function __construct() {
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        function type_game() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('search_model', 'get_type_game'));
        }

        function brand_game() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('search_model', 'get_brand_game'));
        }

        function brand_category() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('search_model', 'get_brand_category'));
        }

        function autocomplete() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('search_model', 'get_autocomplete'));
        }
    }
?>