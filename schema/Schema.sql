
-- run 'mysql -u root < schema/Schema.sql;'

DROP DATABASE IF EXISTS PRODUCTOVERVIEW;
CREATE DATABASE PRODUCTOVERVIEW;
USE PRODUCTOVERVIEW;

-- Products

CREATE TABLE Products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(100) NOT NULL,
  description VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY (id)
);

-- Features

CREATE TABLE Features (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  feature  VARCHAR(250) NOT NULL,
  value VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE Features ADD FOREIGN KEY (product_id) REFERENCES Products (id);

-- Styles

CREATE TABLE Styles (
  styles_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  original_price INT NOT NULL,
  sale_price INT NOT NULL,
  `default?` BOOLEAN NOT NULL,
  PRIMARY KEY (styles_id)
);

ALTER TABLE Styles ADD FOREIGN KEY (product_id) REFERENCES Products (id);

-- Photos

CREATE TABLE Photos (
  id INT NOT NULL AUTO_INCREMENT,
  styles_id INT NOT NULL,
  url VARCHAR(250) NOT NULL,
  thumbnail_url VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE Photos ADD FOREIGN KEY (styles_id) REFERENCES Styles (styles_id);

-- SKUs

CREATE TABLE SKUs (
  id INT NOT NULL AUTO_INCREMENT,
  styles_id INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE SKUs ADD FOREIGN KEY (styles_id) REFERENCES Styles (styles_id);

-- Related Items

CREATE TABLE RelatedItems (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  relateditem_id INT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE RelatedItems ADD FOREIGN KEY (product_id) REFERENCES Products (id);

-- LOAD DATA LOCAL INFILE '/Users/yoseobkim/Documents/HackReactor/immersive/seniorPhase/ProductOverviewDataCenter/Data/product.csv' INTO TABLE Products FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- LOAD DATA LOCAL INFILE '/Users/yoseobkim/Documents/HackReactor/immersive/seniorPhase/ProductOverviewDataCenter/Data/features.csv' INTO TABLE Features FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- LOAD DATA LOCAL INFILE '/Users/yoseobkim/Documents/HackReactor/immersive/seniorPhase/ProductOverviewDataCenter/Data/styles.csv' INTO TABLE Styles FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- LOAD DATA LOCAL INFILE '/Users/yoseobkim/Documents/HackReactor/immersive/seniorPhase/ProductOverviewDataCenter/Data/photos.csv' INTO TABLE Photos FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- LOAD DATA LOCAL INFILE '/Users/yoseobkim/Documents/HackReactor/immersive/seniorPhase/ProductOverviewDataCenter/Data/skus.csv' INTO TABLE SKUs FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- LOAD DATA LOCAL INFILE '/Users/yoseobkim/Documents/HackReactor/immersive/seniorPhase/ProductOverviewDataCenter/Data/related.csv' INTO TABLE RelatedItems FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;