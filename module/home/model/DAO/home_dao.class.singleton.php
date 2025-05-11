<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            //return 'hola getInstance dao';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_carrusel($db) {
        // public function select_data_carrusel() {
            // return 'hola select_data_carrusel';
            $sql = "SELECT * FROM types";
            return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {

            $sql = "SELECT * FROM categories";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_brands($db) {

            $sql = "SELECT * FROM brands";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_cities($db) {

            $sql = "SELECT * FROM cities";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>