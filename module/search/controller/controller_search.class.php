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
            if (empty($_POST['data'])) {
                echo json_encode(common::load_model('search_model', 'get_brand_game'));
            } else {
                $data = $_POST['data'];
                if (is_array($data)) {
                    $data = reset($data); 
                }
                echo json_encode(common::load_model('search_model', 'get_brand_type', $data));
            }
        }
        
        // function brand_category() {
        //     // echo 'hola carrusel';
        //     // exit;
        //     echo json_encode(common::load_model('search_model', 'get_brand_category'));
        // }

        function autocomplete() {
            $complete = $_POST['autocomplete'];
            $type_game = $_POST['type'];
            $brand_game = $_POST['brand'];

            // Lógica según los parámetros recibidos
            if ($type_game && $brand_game) {
                // Ambos presentes
                echo json_encode(common::load_model('search_model', 'get_autocomplete_type_brand', [
                    'complete' => $complete,
                    'type_game' => $type_game,
                    'brand_game' => $brand_game
                ]));
            } elseif ($type_game) {
                // Solo type_game
                echo json_encode(common::load_model('search_model', 'get_autocomplete_type', [
                    'complete' => $complete,
                    'type_game' => $type_game
                ]));
            } elseif ($brand_game) {
                // Solo brand_game
                echo json_encode(common::load_model('search_model', 'get_autocomplete_brand', [
                    'complete' => $complete,
                    'brand_game' => $brand_game
                ]));
            } else {
                // Ninguno
                echo json_encode(common::load_model('search_model', 'get_autocomplete', $complete));
            }
        }
    }
?>