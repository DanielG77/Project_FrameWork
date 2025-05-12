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
            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {

            $sql = "SELECT * FROM categories ORDER BY categories.rating DESC";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_brand($db) {

            $sql = "SELECT * FROM brands";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_city($db) {

            $sql = "SELECT * FROM cities";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

         public function select_data_popular($db) {

            $sql = "SELECT pr.id_prod, pr.name_prod, pr.description_prod, pr.price, cit.name_cities, sta.name_status, GROUP_CONCAT(DISTINCT prim.image_prod ORDER BY prim.image_prod) AS images_prod, 
				GROUP_CONCAT(DISTINCT c.name_cat) AS names_cat, GROUP_CONCAT(DISTINCT e.name_extra) AS name_extras, GROUP_CONCAT(DISTINCT b.name_brand ) AS name_brands,
 				GROUP_CONCAT(DISTINCT t.name_typ) AS names_typs, GROUP_CONCAT(DISTINCT ts.name_typ_sell) AS names_typ_sell, pr.latitud, pr.longitud
				FROM products pr INNER JOIN prod_images prim ON pr.id_prod = prim.product_id
				INNER JOIN product_category pc ON pr.id_prod = pc.id_prod
				INNER JOIN categories c ON c.id_cat = pc.id_cat
				INNER JOIN product_extras pe ON pr.id_prod = pe.id_prod
				INNER JOIN extras e ON e.id_extra = pe.id_extra
				INNER JOIN product_brand pb ON pr.id_prod = pb.id_prod
				INNER JOIN brands b ON b.id_brands = pb.id_brand
				INNER JOIN product_type pt ON pr.id_prod = pt.id_prod
				INNER JOIN types t ON t.id_typ = pt.id_typ
				INNER JOIN product_type_sell tsp ON pr.id_prod = tsp.id_prod
				INNER JOIN type_sell ts ON ts.id_typ_sell = tsp.id_typ_sell
				INNER JOIN cities cit ON pr.id_city = cit.id_cities
                INNER JOIN status_prod sta ON sta.id_stat= pr.id_stat 
				GROUP BY pr.id_prod
                ORDER BY pr.visitas DESC
				LIMIT 10 ";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_rating($db) {

            $sql = "SELECT pr.id_prod, pr.name_prod, pr.description_prod, pr.price, cit.name_cities, sta.name_status, GROUP_CONCAT(DISTINCT prim.image_prod ORDER BY prim.image_prod) AS images_prod, 
				GROUP_CONCAT(DISTINCT c.name_cat) AS names_cat, GROUP_CONCAT(DISTINCT e.name_extra) AS name_extras, GROUP_CONCAT(DISTINCT b.name_brand ) AS name_brands,
 				GROUP_CONCAT(DISTINCT t.name_typ) AS names_typs, GROUP_CONCAT(DISTINCT ts.name_typ_sell) AS names_typ_sell, pr.latitud, pr.longitud
				FROM products pr INNER JOIN prod_images prim ON pr.id_prod = prim.product_id
				INNER JOIN product_category pc ON pr.id_prod = pc.id_prod
				INNER JOIN categories c ON c.id_cat = pc.id_cat
				INNER JOIN product_extras pe ON pr.id_prod = pe.id_prod
				INNER JOIN extras e ON e.id_extra = pe.id_extra
				INNER JOIN product_brand pb ON pr.id_prod = pb.id_prod
				INNER JOIN brands b ON b.id_brands = pb.id_brand
				INNER JOIN product_type pt ON pr.id_prod = pt.id_prod
				INNER JOIN types t ON t.id_typ = pt.id_typ
				INNER JOIN product_type_sell tsp ON pr.id_prod = tsp.id_prod
				INNER JOIN type_sell ts ON ts.id_typ_sell = tsp.id_typ_sell
				INNER JOIN cities cit ON pr.id_city = cit.id_cities
                INNER JOIN status_prod sta ON sta.id_stat= pr.id_stat 
				GROUP BY pr.id_prod
                ORDER BY pr.rating DESC
				LIMIT 10";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
    }
?>