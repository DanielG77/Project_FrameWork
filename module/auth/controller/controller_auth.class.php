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
                echo json_encode(common::load_model(
                    'auth_model',
                    'get_register',
                    [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'email' => $_POST['email'],
                        'username' => $_POST['username'],
                        'passworda' => $_POST['passworda']
                    ]
                ));
        }

         function login() {
            // echo 'hola carrusel';
            // exit;
                echo json_encode(common::load_model(
                    'auth_model',
                    'get_login',
                    [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'username_log' => $_POST['username_log'],
                        'password_log' => $_POST['password_log']
                    ]
                ));
        }
    }
?>

