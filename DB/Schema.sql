
DROP DATABASE IF EXISTS
CREATE DATABASE PRODUCTOVERVIEW;
USE PRODUCTOVERVIEW;

-- Products

CREATE TABLE Products (
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(100) NOT NULL,
  description VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price INT NOT NULL,
  PRIMARY KEY (product_id)
);

-- Features

CREATE TABLE Features (
  feature_id INT NOT NULL,
  product_id INT NOT NULL,
  feature  VARCHAR(250) NOT NULL,
  value VARCHAR(250) NOT NULL,
  PRIMARY KEY (feature_id)
);

ALTER TABLE Features ADD FOREIGN KEY (product_id) REFERENCES Products (product_id);

-- Styles

CREATE TABLE Styles (
  styles_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  original_price INT NOT NULL,
  sale_price INT NOT NULL,
  `default?` BOOLEAN NOT NULL,
  PRIMARY KEY (styles_id)
);

ALTER TABLE Styles ADD FOREIGN KEY (product_id) REFERENCES Products (product_id);

-- Photos

CREATE TABLE Photos (
  photo_id INT NOT NULL,
  styles_id INT NOT NULL,
  thumbnail_url VARCHAR(250) NOT NULL,
  url VARCHAR(250) NOT NULL,
  PRIMARY KEY (photo_Id)
);

ALTER TABLE Photos ADD FOREIGN KEY (styles_id) REFERENCES Styles (styles_id);

-- SKUs

CREATE TABLE SKU (
  sku_id INT NOT NULL,
  styles_id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  PRIMARY KEY (sku_id)
);

ALTER TABLE SKU ADD FOREIGN KEY (styles_id) REFERENCES Styles (styles_id);

-- Related Items

CREATE TABLE RelatedItems (
  relateditem_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY (relateditem_id)
);

ALTER TABLE RelatedItems ADD FOREIGN KEY (product_id) REFERENCES Products (product_id);