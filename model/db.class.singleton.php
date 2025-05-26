<?php
    class db {
        private $server;
        private $user;
        private $password;
        private $database;
        private $link;
        private $stmt;
        private $array;
        static $_instance;

        private function __construct() {
            $this -> setConexion();
            $this -> conectar();
        }
        
        private function setConexion() {
            $ini = parse_ini_file(__DIR__ . '/db.ini');
            $this->user = trim($ini['_userdb'], "'\"");
            $this->password = trim($ini['_passdb'], "'\"");
            $this->server = trim($ini['_hostdb'], "'\"");
            $this->database = trim($ini['_db'], "'\"");
        }

        private function __clone() {

        }

        public static function getInstance() {
            // return 'hola';
            if (!(self::$_instance instanceof self))
                self::$_instance = new self();
            return self::$_instance;
        }

        private function conectar() {
            $this -> link = new mysqli($this -> server, $this -> user, $this -> password);
            $this -> link -> select_db($this -> database);
        }

        public function ejecutar($sql) {
            $this -> stmt = $this -> link -> query($sql);
            return $this->stmt;
        }
        
        public function listar($stmt) {
            $this -> array = array();
            while ($row = $stmt -> fetch_array(MYSQLI_ASSOC)) {
                array_push($this -> array, $row);
            }
            return $this -> array;
        }

    }
