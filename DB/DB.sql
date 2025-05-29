DROP SCHEMA IF EXISTS datapop;

CREATE SCHEMA  datapop;

USE datapop;

CREATE TABLE accesories (
  id_acces INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_type_game INT(11) NOT NULL,
  name_acces VARCHAR(50) UNIQUE NOT NULL,
  price INT(11) NOT NULL,
  image_prod VARCHAR(100) DEFAULT NULL
);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE usuario
ADD COLUMN type_user VARCHAR(20) NOT NULL DEFAULT 'Client';
ADD COLUMN refresh_token VARCHAR(255) DEFAULT NULL,
ADD COLUMN access_token VARCHAR(255) DEFAULT NULL;
ADD COLUMN avatar VARCHAR(255) NOT NULL;

-- Ahora añadimos el nuevo campo token_banned
ALTER TABLE usuario
ADD COLUMN token_banned VARCHAR(25) DEFAULT NULL;

CREATE TABLE categories (
  id_cat INT(11),
  name_cat VARCHAR(25) NOT NULL,
  img_cat VARCHAR(100) DEFAULT NULL
);

ALTER TABLE categories ADD COLUMN rating int(10) NOT NULL DEFAULT 0;

CREATE TABLE types (
  id_typ INT(11),
  name_typ VARCHAR(25) NOT NULL,
  img_typ  VARCHAR(100) DEFAULT NULL
);


CREATE TABLE brands (
  id_brands INT(11),
  name_brand VARCHAR(25) NOT NULL,
  img_bra  VARCHAR(100) DEFAULT NULL
);


CREATE TABLE cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    direccion VARCHAR(255)
);


CREATE TABLE type_sell (
  id_typ_sell INT(11) NOT NULL,
  name_typ_sell VARCHAR(25) NOT NULL,
  image_tipsell VARCHAR(100) DEFAULT NULL
);


CREATE TABLE extras (
  id_extra INT(11) NOT NULL,
  name_extra VARCHAR(25) NOT NULL,
  image_ext VARCHAR(100) DEFAULT NULL
);


CREATE TABLE status_prod (
  id_stat INT(11) NOT NULL,
  name_status VARCHAR(25) NOT NULL,
  image_stat VARCHAR(100) DEFAULT NULL
);


CREATE TABLE products (
  id_prod INT(11) NOT NULL,
  name_prod VARCHAR(50) UNIQUE NOT NULL,
  description_prod VARCHAR(250),
  price INT(11) NOT NULL,
  discount INT(11) DEFAULT NULL,
  id_stat INT(11) NOT NULL,
  id_city INT(25) NOT NULL,
  latitud VARCHAR(25),
  longitud VARCHAR(25),
  visitas INT(11) DEFAULT 0;
);

ALTER TABLE products ADD COLUMN rating int(10) NOT NULL DEFAULT 0;


CREATE TABLE prod_images (
  id_img INT(11) NOT NULL,
  product_id INT(11) NOT NULL,
  image_prod VARCHAR(100) DEFAULT NULL
);


CREATE TABLE iconos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ico_name VARCHAR(25) UNIQUE NOT NULL,
    ico_img VARCHAR(500) NOT NULL
);


CREATE TABLE filters (
    id_filter int(11) NOT NULL,
    typ_filtro VARCHAR(25) NOT NULL,
    name_filtro VARCHAR(25) NOT NULL
	);

CREATE TABLE filters_value (
    id_value  int(11) NOT NULL,
    id_filter int(11) NOT NULL,
    valor VARCHAR(25) NOT NULL
	);

CREATE TABLE likes (
    id_like INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_prod INT(11) NOT NULL,
    username VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_prod) REFERENCES products(id_prod),
    FOREIGN KEY (username) REFERENCES usuario(username),
    UNIQUE KEY unique_like (id_prod, username)
);

--
-- Many to Many
--
CREATE TABLE product_category (
  id_cat  INT(11) NOT NULL,
  id_prod  INT(11) NOT NULL
);


CREATE TABLE product_type (
  id_typ INT(11) NOT NULL,
  id_prod INT(11) NOT NULL
);


CREATE TABLE product_brand (
  id_brand INT(11) NOT NULL,
  id_prod INT(11) NOT NULL
);


CREATE TABLE product_type_sell (
  id_typ_sell INT(11) NOT NULL,
  id_prod INT(11) NOT NULL
);


CREATE TABLE product_extras (
  id_extra INT(11) NOT NULL,
  id_prod INT(11) NOT NULL
);

 
--
-- Alter Tables
---- PRIMARY KEYS
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_cat`);

ALTER TABLE `types`
  ADD PRIMARY KEY (`id_typ`);

ALTER TABLE `brands`
  ADD PRIMARY KEY (`id_brands`);

ALTER TABLE `type_sell`
  ADD PRIMARY KEY (`id_typ_sell`);

ALTER TABLE `extras`
  ADD PRIMARY KEY (`id_extra`);

ALTER TABLE `status_prod`
  ADD PRIMARY KEY (`id_stat`);

ALTER TABLE `cities`
  ADD PRIMARY KEY (`id_cities`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id_prod`);


ALTER TABLE `prod_images`
  ADD PRIMARY KEY (`id_img`);

ALTER TABLE `filters` 
  ADD PRIMARY KEY (`id_filter`);

ALTER TABLE `filters_value` 
  ADD PRIMARY KEY (`id_value`);

-- MANY TO MANY PRIMARY KEYS NOT FOUND
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id_cat`, `id_prod`);

ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id_typ`, `id_prod`);

ALTER TABLE `product_brand`
  ADD PRIMARY KEY (`id_brand`, `id_prod`);

ALTER TABLE `product_type_sell`
  ADD PRIMARY KEY (`id_typ_sell`, `id_prod`);

ALTER TABLE `product_extras`
  ADD PRIMARY KEY (`id_extra`, `id_prod`);

-- AUTO_INCREMENT
ALTER TABLE `categories`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `types`
  MODIFY `id_typ` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `brands`
  MODIFY `id_brands` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `type_sell`
  MODIFY `id_typ_sell` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `extras`
  MODIFY `id_extra` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `status_prod`
  MODIFY `id_stat` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `cities`
  MODIFY `id_cities` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `products`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `prod_images`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `filters`
  MODIFY `id_filter` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `filters_value`
  MODIFY `id_value` int(11) NOT NULL AUTO_INCREMENT;

-- INSERTS
INSERT INTO `categories` (`id_cat`, `name_cat`, `img_cat`) VALUES
(1, 'Fantasia', 'view/img/categories/fantasia.jpg'),
(2, 'Ciencia Ficcion', 'view/img/categories/ciencia_ficcion.jpg'),
(3, 'Terror', 'view/img/categories/terror.jpg'),
(4, 'Familiar', 'view/img/categories/family.jpeg');

INSERT INTO `types` (`id_typ`, `name_typ`, `img_typ`) VALUES
(1, 'Wargame', 'view/img/type/wargames.webp'),
(2, 'Cardgame', 'view/img/type/card_games.webp'),
(3, 'Partygame', 'view/img/type/partygame.jpg'),
(4, 'Rolgame', 'view/img/type/rolGame.jpg');

INSERT INTO `brands` (`id_brands`, `name_brand`, `img_bra`) VALUES
(1, 'Warhammer', 'view/img/brand/warhammer.jpg'),
(2, 'Corvus Belli', 'view/img/brand/Corvus_Belli.jpg'),
(3, 'Wizard Of The Cost', 'view/img/brand/wizard_of_the_cost.jpg'),
(4, 'Ankama', 'view/img/brand/ankama.jpg');

INSERT INTO `cities` (`id_cities`, `name_cities`, `img_cities`) VALUES
(1, 'Sevilla', 'view/img/cities/Sevilla.jpg'),
(2, 'Javea', 'view/img/cities/Javea.jpg'),
(3, 'Barcelona', 'view/img/cities/Barcelona.jpeg'),
(4, 'Madrid', 'view/img/cities/Madrid.jpeg'),
(5, 'San Sebastian', 'view/img/cities/SanSebastian.jpeg');

INSERT INTO `type_sell` (`id_typ_sell`, `name_typ_sell`, `image_tipsell`) VALUES
(1, 'Venta', ''),
(2, 'Alquiler', ''),
(3, 'Subasta', '');

INSERT INTO `extras` (`id_extra`, `name_extra`, `image_ext`) VALUES
(1, 'Seguro', ''),
(2, 'Envio Rapido', ''),
(3, 'Sello de Calidad', '');

INSERT INTO `status_prod` (`id_stat`, `name_status`, `image_stat`) VALUES
('Nuevo', ''),
('Segunda Mano', ''),
('Parcialmente Dañado', ''),
('Dañado', '');

INSERT INTO `products` (`id_prod`, `name_prod`, `description_prod`, `price`, `discount`, `id_stat`, `id_city`, `latitud`, `longitud`) VALUES
(1, 'Warhammer 40k Starter Set', 'Juego de miniaturas de estrategia ambientado en el futuro.', 120.99, 10.00, 1, 1, '37,379711', '-5,981144'),
(2, 'Infinity Operation: Blackwind', 'Juego de miniaturas de ciencia ficción táctica.', 85.50, 5.00, 3, 2, '38,790484', '0,162301'),
(3, 'Krosmaster Arena', 'Juego de estrategia con miniaturas ambientado en el universo de Ankama.', 50.00, 0.00, 2, 3, '41,389646', '2,166015'),
(4, 'Magic: The Gathering - Booster Box', 'Caja de sobres de cartas coleccionables.', 90.00, 15.00, 1, 4, '-3,704176'),
(5, 'Dungeons & Dragons - Starter Set', 'Kit de inicio para jugar a D&D con todo lo necesario.', 45.99, 20.00, 4, 5, '43.312712', '-2.000379'),
(6, 'Zombicide', 'Juego cooperativo de supervivencia contra zombis.', 89.99, 10.00, 3, 6, '43.312712', '-2.000379'),
(7, 'Catan', 'Juego de estrategia y comercio con mecánicas de negociación.', 34.99, 5.00, 2, 7, '43.312712', '-2.000379'),
(8, 'Exploding Kittens', 'Divertido juego de cartas de eliminación rápida.', 19.99, 0.00, 1, 8,  '37,379711', '-5,981144'),
(9, 'Blood Bowl', 'Juego de miniaturas de fútbol americano en un mundo de fantasía.', 75.00, 12.00, 5, 9),
(10, 'Arkham Horror', 'Juego narrativo basado en los mitos de Lovecraft.', 60.00, 8.00, 1, 10,  '37,379711', '-5,981144');

INSERT INTO `prod_images` (`id_img`, `product_id`, `image_prod`) VALUES
( '1', 'view/img/product/warhammerstartset1.jpg'),
( '2', 'view/img/product/infinityblackwind1.jpg'),
( '3', 'view/img/product/krosmasterarena1.jpeg'),
( '4', 'view/img/product/magicboosterbox1.png');

--FALTA ICONOS
--
--

INSERT INTO `filters` (`id_filter`, `typ_filtro`, `id_filtro`)
VALUES ('1', 'select' ,'name_typ'), ('2', 'select' ,'name_cat'), ('3', 'select' ,'name_brand'), ('4', 'checkbox' ,'name_typ_sell'), ('5', 'select' ,'name_cities')

INSERT INTO `filters_value`  (`id_filter` ,`valor`) VALUES ('1','Wargame'), ('1','Juego de Cartas'), ('1','Juego con Amigos'), ('1','Juego de Rol'), 
('2','Fantasia'), ('2','Ciencia Ficcion'), ('2','Terror'), ('2','Familiar'), 
('3','Warhammer'), ('3','Corvus Belli'), ('3','Ankama'), ('3','Wizard of the Cost'), 
('4','Venta'), ('4','Alquiler'), ('4','Subasta'), 
('5','Sevilla'), ('5','Javea'), ('5','Barcelona'), ('5','Madrid'), ('5','San Sebastian');
--MANY To ANY

INSERT INTO product_category (id_cat, id_prod) VALUES
(1, 1), (2, 1), (2, 2),(1, 3), (2, 4), (1, 4), (1, 5), (4, 5), (1, 6), (3, 6), (4, 6),(4, 7), (4, 8), (1, 9), (4, 9), (1, 10), (3, 10); 

INSERT INTO product_type (id_typ, id_prod) VALUES
(1, 1), (1, 2), (1, 3), (2, 4), (4, 5), (3, 6), (3, 7),(3, 8), (1, 9),(3, 10);

INSERT INTO product_brand (id_brand, id_prod) VALUES
(1, 1), (2, 2),(4, 3), (3, 4),(3, 5),(1, 9);

INSERT INTO product_type_sell (id_typ_sell, id_prod) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),(1, 7), (1, 8), (1, 9), (1, 10);

INSERT INTO product_extras (id_extra, id_prod) VALUES
(1, 1), (2, 2), (3, 3), (1, 4), (2, 5), (3, 6), (1, 7), (2, 8), (3, 9), (1, 10);