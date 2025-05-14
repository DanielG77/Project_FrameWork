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
    }
?>