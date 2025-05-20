<?php
    class controller_auth {
        function view() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_auth.html', VIEW_PATH_AUTH . 'auth.html');
        }
         function register() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('auth_model', 'get_register', [$_POST['email'], $_POST['username'], $_POST['passworda']]));        }
    }
?>