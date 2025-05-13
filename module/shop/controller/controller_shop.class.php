<?php
    class controller_shop {
        function view() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }
        function products() {
            // echo 'hola view';
            // exit;
            common::load_view('shop_model', VIEW_PATH_SHOP . 'get_products');
        }
    }
?>