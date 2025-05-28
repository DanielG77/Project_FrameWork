<?php
    class search_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            // return 'hola __construct';
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            // return 'hola getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_type_game() {
            // return 'hola get_carrusel';
            return $this -> bll -> get_type_game_BLL();
        }

        public function get_brand_game($filter) {
            // return 'hola car brands';
            return $this->bll->get_brand_game_BLL($filter);
        }

        public function get_brand_category($args) {
            // return 'hola car brands';
            return $this->bll->get_brand_category_BLL($args);
        }

        public function get_autocomplete($args) {
            // return 'hola car brands';
            return $this->bll->get_autocomplete_BLL($args);
        }
    }
?>