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
            echo json_encode(common::load_model('shop_model', 'get_more_visited', $_POST['id']));
        }

        // LIKES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         function load_likes() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_count_paginacion'));
        }

         function load_likes_details() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_count_paginacion_filters', $_POST['filters']));
        }

        function control_likes() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_more_visited', $_POST['id']));
        }
    }
?>