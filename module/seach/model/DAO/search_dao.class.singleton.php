<?php
    class search_dao {
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

		// function select_brand(){
        //     $sql = "SELECT DISTINCT b.*
		// 			FROM brands b INNER JOIN product_brand pb ON b.id_brands=b.id_brands";

		// 	$conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        //     return $res;
        // }

        // function select_type_brand($type){
        //     $sql = "SELECT DISTINCT br.name_brand
        //             FROM products pr
        //             INNER JOIN product_brand pr_br ON pr.id_prod=pr_br.id_prod
        //             INNER JOIN brands br ON br.id_brands=pr_br.id_brand
        //             INNER JOIN product_type pr_ty ON pr.id_prod=pr_ty.id_prod 
        //             INNER JOIN types ty ON ty.id_typ=pr_ty.id_typ
        //             INNER JOIN prod_images pr_img ON pr.id_prod=pr_img.product_id
        //             WHERE ty.name_typ = '$type'";

		// 	$conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        //     return $res;
        // }

        // function select_auto_type_game($auto, $type){
        //     $sql = "SELECT DISTINCT t.name_typ, c.name_cities
		// 			FROM types t INNER JOIN product_type tp ON t.id_typ=tp.id_typ
		// 			INNER JOIN products p ON p.id_prod=tp.id_prod
		// 			INNER JOIN cities c ON c.id_cities=p.id_city
		// 			WHERE t.name_typ LIKE '$type%'
		// 			AND c.name_cities LIKE '$auto%'";
		// 	$conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        //     return $res;
        // }

        // function select_auto_brand_game($auto, $brand){
        //     $sql = "SELECT DISTINCT b.name_brand, c.name_cities
        //             FROM brands b INNER JOIN product_brand pb ON b.id_brands=pb.id_brand
        //             INNER JOIN products p ON p.id_prod=pb.id_prod
        //             INNER JOIN cities c ON c.id_cities=p.id_city
        //             WHERE b.name_brand LIKE '$brand%'
        //             AND c.name_cities LIKE '$auto%'";

        //     // return $sql;
		// 	$conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        //     return $res;
        // }

        // function select_auto_type_brand_game($auto, $type, $brand){
        //     $sql = "SELECT DISTINCT b.name_brand, c.name_cities
        //             FROM brands b 
        //             INNER JOIN product_brand pb ON b.id_brands=pb.id_brand
        //             INNER JOIN products p ON p.id_prod=pb.id_prod
        //             INNER JOIN product_type tp ON tp.id_prod=p.id_prod
        //             INNER JOIN types t ON t.id_typ=tp.id_typ
        //             INNER JOIN cities c ON c.id_cities=p.id_city
        //             INNER JOIN product_category pc ON p.id_prod = pc.id_prod
        //             INNER JOIN categories cat ON cat.id_cat = pc.id_cat
        //             INNER JOIN product_extras pe ON pe.id_prod=p.id_prod
        //             INNER JOIN extras e ON e.id_extra = pe.id_extra
        //             INNER JOIN product_type_sell tsp ON p.id_prod = tsp.id_prod
        //             INNER JOIN type_sell ts ON ts.id_typ_sell = tsp.id_typ_sell
        //             INNER JOIN status_prod sta ON sta.id_stat= p.id_stat 
        //             WHERE b.name_brand LIKE '$brand%'
        //             AND t.name_typ LIKE '$type%'
        //             AND c.name_cities LIKE '$auto%'";
        //     // return $sql;
		// 	$conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        //     return $res;
        // }

		// function select_auto($auto){
        //     $sql = "SELECT DISTINCT c.name_cities
		// 			FROM cities c
		// 			WHERE c.name_cities LIKE '$auto%'";
        //     // return $sql;
		// 	$conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        //     return $res;
        // }
	}