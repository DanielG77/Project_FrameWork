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

        public function get_brand_game() {
            // return 'hola car brands';
            return $this->bll->get_brand_game_BLL();
        }

        public function get_brand_type($args) {
            // return 'hola car brands';
            return $this->bll->get_brand_type_BLL($args);
        }

        //////////////////////////////////////////////////////////////////////////////////////
        public function get_autocomplete($args) {
            // return $args;
            return $this->bll->get_autocomplete_BLL($args);
        }
        public function get_autocomplete_type_brand($args) {
            // return 'hola car brands';
            return $this->bll->get_autocomplete_type_brand_BLL($args);
        }
        public function get_autocomplete_type($args) {
            // return 'hola car brands';
            return $this->bll->get_autocomplete_type_BLL($args);
        }
        public function get_autocomplete_brand($args) {
            // return 'hola car brands';
            return $this->bll->get_autocomplete_brand_BLL($args);
        }
    }
?>