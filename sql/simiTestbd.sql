CREATE DATABASE IF NOT EXISTS simitest;

CREATE  TABLE IF NOT EXISTS `simitest`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL ,
  `total` INT NOT NULL ,
  `remaining` VARCHAR(150) NOT NULL ,
  `pharmacy` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

CREATE  TABLE IF NOT EXISTS `simitest`.`pharmacy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL ,
  `minProd` INT NOT NULL ,
  `maxProd` VARCHAR(150) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;