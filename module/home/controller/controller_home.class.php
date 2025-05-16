<?php
    class controller_home {

        // function __construct() {
        // }

        // public static function getInstance() {
        //     // return 'hola getInstance';
        //     if (!(self::$_instance instanceof self)) {
        //         self::$_instance = new self();
        //     }
        //     return self::$_instance;
        // }

        function view() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }

        function carrusel() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('home_model', 'get_carrusel'));
        }

        function category() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('home_model', 'get_category'));
        }
        
        function brand() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_brand'));
        }

        function city() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_city'));
        }

        function popular() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_popular'));
        }
        function rating() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_rating'));
        }
    }
?>