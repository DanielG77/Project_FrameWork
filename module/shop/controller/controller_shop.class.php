<?php
    class controller_shop {
        function view() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }
        function products() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_products'));
        }

        function filters() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }

        function product_filters() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('shop_model', 'get_product_filters', $_POST['filters']));
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
    }
?>