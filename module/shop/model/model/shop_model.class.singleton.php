<?php
    class shop_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            // return 'hola __construct';
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            // return 'hola getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_products($arguments) {
            // return 'hola get_carrusel';
            return $this -> bll -> get_products_BLL($arguments);
        }

        public function get_filters() {
            return $this -> bll -> get_filters_BLL();
        }

        public function get_product_filters($arguments) {
            // return 'hola car brands';
            return $this->bll->get_product_filters_BLL($arguments);
        }

        public function get_details($id) {
            // return 'hola car brands';
            return $this -> bll -> get_details_BLL($id);
        }

        public function get_count_paginacion() {
            // return 'hola car brands';
            return $this -> bll -> get_count_paginacion_BLL();
        }

        public function get_count_paginacion_filters($filter) {
            // return 'hola car brands';
            return $this -> bll -> get_count_paginacion_filters_BLL($filter);
        }

        public function get_more_visited($args) {
            // return 'hola car brands';
            return $this -> bll -> get_more_visited_BLL($args);
        }

        public function get_games_related($args) {
            // return 'hola car brands';
            return $this -> bll -> get_games_related_BLL($args);
        }

        public function get_count_related($args) {
            // return 'hola car brands';
            return $this -> bll -> get_count_related_BLL($args);
        }

        public function get_control_likes($args) {
            // return 'hola car brands';
            return $this -> bll -> get_control_likes_BLL($args);
        }

        public function get_load_likes($args) {
            // return 'hola car brands';
            return $this -> bll -> get_load_likes_BLL($args);
        }

        public function get_load_likes_details($args) {
            // return 'hola car brands';
            return $this -> bll -> get_load_likes_details_BLL($args);
        }
    }
?>