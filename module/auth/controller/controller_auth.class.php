<?php
    class controller_auth {

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
            common::load_view('top_page_auth.html', VIEW_PATH_AUTH . 'auth.html');
        }

        function recover_acount() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_auth.html', VIEW_PATH_AUTH . 'recover_acount.html');
        }

        function verify_email() {
            
            $verify = json_encode(common::load_model('auth_model', 'get_verify_email', $_POST['token_email']));
            echo json_encode(value: $verify);
        }
        
        function recover() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_auth.html', VIEW_PATH_AUTH . 'recover.html');
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

         function user() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('auth_model', 'get_user', $_POST['token']));
        }

         function logout() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('auth_model', 'get_logout'));
        }
        
        function social_login() {
            // echo 'hola carrusel';
            // exit;
            echo json_encode(common::load_model('auth_model', 'get_social_login', [
                'username' => $_POST['username'],
                'email' => $_POST['email'],
                'avatar' => $_POST['avatar']
            ]));
        }

         function controluser() {
            echo json_encode(common::load_model('auth_model', 'get_controluser', $_POST['token']));
        }

         function activity() {
            echo json_encode(common::load_model('auth_model', 'get_activity'));
        }

         function token_expires() {
            echo json_encode(common::load_model('auth_model', 'get_token_expires', $_POST['token']));
        }

        function refresh_cookie() {
            session_regenerate_id();
        } 

        function refresh_token() {
            echo json_encode(common::load_model('auth_model', 'get_refresh_token', $_POST['token']));
        }

        function firebase_config() {
            echo json_encode(common::load_model('auth_model', 'get_firebase_config'));
        }

         function send_recover_email() {
            echo json_encode(common::load_model('auth_model', 'get_send_recover_email', $_POST['data']));
        }

         function new_password() {
            echo json_encode(common::load_model('auth_model', 'get_new_password', $_POST['data']));
        }

        function data_token_banned() {
            echo json_encode(common::load_model('auth_model', 'get_data_token_banned', $_POST['username_log']));
        }

        function user_state() {
            echo json_encode(common::load_model('auth_model', 'get_user_state', [ // <-- ESTO DEBE SER UN ARRAY ASOCIATIVO
                        'username_log' => $_POST['username_log'],
                        'is_blocking' => $_POST['is_blocking']
                    ]));
        }

        
    }
?>

