<?php
    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            // return 'hola __construct';
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            // return 'hola getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_carrusel() {
            // return 'hola get_carrusel';
            return $this -> bll -> get_carrusel_BLL();
        }

        public function get_category() {
            return $this -> bll -> get_category_BLL();
        }

        public function get_brand() {
            // return 'hola car brands';
            return $this -> bll -> get_brand_BLL();
        }

        public function get_city() {
            // return 'hola car brands';
            return $this -> bll -> get_city_BLL();
        }

        public function get_popular() {
            // return 'hola car brands';
            return $this -> bll -> get_popular_BLL();
        }

        public function get_rating() {
            // return 'hola car brands';
            return $this -> bll -> get_rating_BLL();
        }
    }
?>