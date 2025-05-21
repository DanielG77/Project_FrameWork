<?php
    class auth_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            // return 'hola __construct';
            $this -> bll = auth_bll::getInstance();
        }

        public static function getInstance() {
            // return 'hola getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

         public function get_register($arguments) {
            // return 'hola get_carrusel';
            return $this -> bll -> get_register_BLL($arguments);
        }

        public function get_login($arguments) {
            // return 'hola get_carrusel';
            return $this -> bll -> get_login_BLL($arguments);
        }

        public function get_user($token) {
            // return 'hola get_carrusel';
            return $this -> bll -> get_user_BLL($token);
        }

        public function get_logout() {
            // return 'hola get_carrusel';
            return $this -> bll -> get_logout_BLL();
        }
    }
?>