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

        public function get_products() {
            // return 'hola get_carrusel';
            return $this -> bll -> get_products_BLL();
        }

        public function get_filters() {
            return $this -> bll -> get_filters_BLL();
        }

        public function get_product_filters($filter) {
            // return 'hola car brands';
            return $this->bll->get_product_filters_BLL($filter);
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
    }
?>