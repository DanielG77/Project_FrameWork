<?php
    class controller_shop {

        static $_instance;

         function __construct() {
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        function view() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

       function products() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_products', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'total_prod' => $_POST['total_prod'],
                        'items_page' => $_POST['items_page'],
                    ]));
        }

        function filters() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }

        function product_filters() {
            // echo 'hola carrusel';
            // exit;
                echo json_encode(common::load_model('shop_model', 'get_product_filters', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'total_prod' => $_POST['total_prod'],
                        'items_page' => $_POST['items_page'],
                        'filters' => $_POST['filters']
                    ]
                ));
        }

        function details() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_details', $_POST['id']));
        }

         function count_paginacion() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_count_paginacion'));
        }

         function count_paginacion_filters() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_count_paginacion_filters', $_POST['filters']));
        }

        function more_visited() {
            // echo 'hola carrusel';
            // exit;
            common::load_model('shop_model', 'get_more_visited', $_POST['id']);
            echo json_encode(['success' => true]);
        }

        // LIKES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         function load_likes() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_load_likes', $_POST['token']));
        }

         function load_likes_details() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_load_likes_details', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'token' => $_POST['token'],
                        'id' => $_POST['id'],
                    ]));
        }

        function control_likes() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_control_likes', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'token' => $_POST['token'],
                        'id' => $_POST['id'],
                    ]));
        }

        function games_related() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_games_related', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'type' => $_POST['type'],
                        'loaded' => $_POST['loaded'],
                        'items' => $_POST['items'],
                        'id_prod' => $_POST['id_prod'],
                    ]));
        }

        function count_related() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_count_related', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'type_game' => $_POST['type_game'],
                        'id_prod' => $_POST['id_prod'],
                    ]));
        }
    }
?>