<?php
    class shop_dao {
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

        public function select_data_products($db, $total_prod, $items_page) {
        // public function select_data_carrusel() {
            // return 'hola select_data_carrusel';
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
				LIMIT $total_prod, $items_page";
            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_filters($db) {

            $sql = "SELECT f.*, GROUP_CONCAT(DISTINCT fv.valor) AS valores
            FROM filters f INNER JOIN filters_value fv ON f.id_filter=fv.id_filter
            GROUP BY f.id_filter";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_product_filters($db, $total_prod, $items_page, $filter) {

            $sql = "SELECT DISTINCT p.*, cit.name_cities, sta.name_status, GROUP_CONCAT(DISTINCT pi.image_prod ORDER BY pi.id_img) AS images_prod
				FROM products p
				INNER JOIN types t
				INNER JOIN product_type tp
				INNER JOIN product_category cp
				INNER JOIN categories c
                INNER JOIN product_brand bp
                INNER JOIN brands b
				INNER JOIN product_type_sell tps
                INNER JOIN type_sell ts
                INNER JOIN cities cit
				INNER JOIN prod_images pi
				INNER JOIN status_prod sta

				ON p.id_prod=tp.id_prod AND tp.id_typ=t.id_typ 
				AND p.id_prod=cp.id_prod AND cp.id_cat=c.id_cat
                AND p.id_prod=bp.id_prod AND b.id_brands=bp.id_brand
                AND p.id_prod=tps.id_prod AND tps.id_typ_sell=ts.id_typ_sell
				AND p.id_prod=pi.product_id AND cit.id_cities=p.id_city 
				AND sta.id_stat= p.id_stat ";

			$consulta = "";
			$ordenar = "";
            for ($i=0; $i < count($filter); $i++){

				$nom = $filter[$i][0];
				$nom_fil = $filter[$i][1];				

				// return $nom;
				// return $nom_fil;
				// return $value_fil;

				switch($nom){
					case "name_typ":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){
							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							// Comprobar si $nom_fil tiene formato JSON
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " t." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " t." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;

            		case "name_cat":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " c." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " c." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;
						
					case "name_brand":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							// Comprobar si $nom_fil tiene formato JSON
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " b." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " b." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;

					case "name_cities":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							// Comprobar si $nom_fil tiene formato JSON
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " cit." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " cit." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;
	
					case "name_typ_sell":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							// Decodificar el JSON
							$value_fil = json_decode($nom_fil, true);
							
							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							
							// Construir la consulta
							$consulta .= " ts." . $nom . " IN (";
							
							for ($j = 0; $j < count($value_fil); $j++) {
								if ($j == 0) {
									$consulta .= "'" . $value_fil[$j] . "'";
								} else {
									$consulta .= ", '" . $value_fil[$j] . "'";
								}
							}
							
							$consulta .= ") ";
						}
						break;	

					case "order_by":
						if(($nom!=null) && ($nom!=0 )&& ($nom!="undefined")){

							// Comprobar si $nom_fil tiene formato JSON
								$ordenar .= "ORDER BY p." . $nom_fil;
						}
						break;			
				}
			}
			if (!empty($consulta)) {
				$sql .= " WHERE " . $consulta;
			}

			$sql .=	" GROUP BY p.id_prod ";
			
			if (!empty($ordenar)) {
				$sql .=	$ordenar;
			}

			$sql .=		" LIMIT $total_prod, $items_page";;
            // return $sql;

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_details($db, $id) {
    	$sql = "SELECT pr.id_prod, pr.name_prod, cit.name_cities ,pr.description_prod, pr.price, sta.name_status, AVG(pr.rating) AS rating_vg,
        GROUP_CONCAT(DISTINCT prim.image_prod ORDER BY prim.image_prod) AS images_prod, 
        GROUP_CONCAT(DISTINCT c.name_cat) AS names_cat, GROUP_CONCAT(DISTINCT e.name_extra) AS name_extras,
        GROUP_CONCAT(DISTINCT b.name_brand ) AS name_brands, GROUP_CONCAT(DISTINCT t.name_typ) AS names_typs,
        GROUP_CONCAT(DISTINCT ts.name_typ_sell) AS names_typ_sell, pr.latitud, pr.longitud
        FROM products pr 
        INNER JOIN prod_images prim ON pr.id_prod = prim.product_id
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
        WHERE pr.id_prod = '$id'
        GROUP BY pr.id_prod";

    $stmt = $db->ejecutar($sql);
    $result = $stmt->fetch_object();
    $stmt->close();
    return $result;
		}
		
         public function select_data_count_paginacion($db) {

            $sql = "SELECT COUNT(DISTINCT pr.id_prod) AS contador
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
				INNER JOIN status_prod sta ON sta.id_stat= pr.id_stat";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_count_paginacion_filters($db, $filter) {

            $sql = "SELECT COUNT(DISTINCT p.id_prod) AS contador
				FROM products p
				INNER JOIN types t
				INNER JOIN product_type tp
				INNER JOIN product_category cp
				INNER JOIN categories c
                INNER JOIN product_brand bp
                INNER JOIN brands b
				INNER JOIN product_type_sell tps
                INNER JOIN type_sell ts
                INNER JOIN cities cit
				INNER JOIN prod_images pi
			
				ON p.id_prod=tp.id_prod AND tp.id_typ=t.id_typ 
				AND p.id_prod=cp.id_prod AND cp.id_cat=c.id_cat
                AND p.id_prod=bp.id_prod AND b.id_brands=bp.id_brand
                AND p.id_prod=tps.id_prod AND tps.id_typ_sell=ts.id_typ_sell
				AND p.id_prod=pi.product_id
                AND cit.id_cities=p.id_city";

			$consulta = "";
			$ordenar = "";
            for ($i=0; $i < count($filter); $i++){

				$nom = $filter[$i][0];
				$nom_fil = $filter[$i][1];				

				// return $nom;
				// return $nom_fil;
				// return $value_fil;

				switch($nom){
					case "name_typ":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){
							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							// Comprobar si $nom_fil tiene formato JSON
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " t." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " t." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;

            		case "name_cat":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " c." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " c." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;
						
					case "name_brand":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							// Comprobar si $nom_fil tiene formato JSON
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " b." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " b." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;

					case "name_cities":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							// Comprobar si $nom_fil tiene formato JSON
							$decodedValue = json_decode($nom_fil, true);
							if (json_last_error() === JSON_ERROR_NONE) {
								$consulta .= " cit." . $nom . " IN ('" . implode("', '", $decodedValue) . "')";
							} else {
								$consulta .= " cit." . $nom . "=" . "'$nom_fil'";
							}
						}
						break;
	
					case "name_typ_sell":
						if(($nom_fil!=null) && ($nom_fil!=0 )&& ($nom_fil!="undefined")){

							// Decodificar el JSON
							$value_fil = json_decode($nom_fil, true);
							
							if (!empty($consulta)) {
								$consulta .= " AND ";
							}
							
							// Construir la consulta
							$consulta .= " ts." . $nom . " IN (";
							
							for ($j = 0; $j < count($value_fil); $j++) {
								if ($j == 0) {
									$consulta .= "'" . $value_fil[$j] . "'";
								} else {
									$consulta .= ", '" . $value_fil[$j] . "'";
								}
							}
							
							$consulta .= ") ";
						}
						break;	

					case "order_by":
						if(($nom!=null) && ($nom!=0 )&& ($nom!="undefined")){

							// Comprobar si $nom_fil tiene formato JSON
								$ordenar .= " ORDER BY p." . $nom_fil;
						}
						break;			
				}
			}
			if (!empty($consulta)) {
				$sql .= " WHERE " . $consulta;
			}
			
			if (!empty($ordenar)) {
				$sql .=	$ordenar;
			}

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

		 public function update_data_visited($db, $id) {

            $sql = "UPDATE `products` SET visitas = visitas + 1 WHERE id_prod ='$id'";
            $db->ejecutar($sql);
            return true;
        }
		
		public function select_data_games_related($db, $id, $items, $loaded, $type ) {

            $sql = "SELECT pr.id_prod, pr.name_prod, pr.description_prod, pr.price, pr.discount, cit.name_cities, sta.name_status, GROUP_CONCAT(DISTINCT prim.image_prod ORDER BY prim.image_prod) AS images_prod, 
				GROUP_CONCAT(DISTINCT c.name_cat) AS names_cat, GROUP_CONCAT(DISTINCT e.name_extra) AS name_extras, GROUP_CONCAT(DISTINCT b.name_brand ) AS name_brands,
 				t.name_typ, GROUP_CONCAT(DISTINCT ts.name_typ_sell) AS names_typ_sell, pr.latitud, pr.longitud
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
				WHERE t.name_typ = '$type' AND pr.id_prod != $id
				GROUP BY pr.id_prod
				LIMIT $loaded, $items";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

		public function select_data_count_related($db, $id_prod, $type_game ) {

            $sql = "SELECT COUNT(DISTINCT pr.id_prod) AS num_prods
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
				WHERE t.name_typ = '$type_game' AND pr.id_prod != $id_prod ";

			
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

		public function select_likes($db, $id, $username){

            $sql = "SELECT * FROM likes WHERE username='$username' AND id_prod='$id' ";

			// return $sql;
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $id, $username){

            $sql = "INSERT INTO likes (username, id_prod) VALUES ('$username','$id')";

            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $id, $username){

            $sql = "DELETE FROM likes WHERE username='$username' AND id_prod='$id'";

            $stmt = $db->ejecutar($sql);
            return "unlike";
        }

		public function select_load_likes($db, $username){

            $sql = "SELECT id_prod FROM likes WHERE username='$username'";

			// return $sql;
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

		public function select_load_likes_details($db, $username, $id){

            $sql = "SELECT id_prod FROM likes WHERE username='$username' AND id_prod='$id'";

			// return $sql;
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    }
?>