DROP SCHEMA IF EXISTS `zadel_db`;
CREATE SCHEMA `zadel_db` DEFAULT CHARACTER SET utf8mb4 ;
USE `zadel_db`;

CREATE TABLE `typeProducts`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryName` VARCHAR(255) NOT NULL
);
CREATE TABLE `products`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `discount` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `stock` INT NOT NULL,
    `typeProductId` INT NOT NULL,
    FOREIGN KEY(`typeProductId`) REFERENCES `typeProducts`(`id`)
);
CREATE TABLE `typeUsers`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phone` INT NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthday` DATE NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `typeUserId` INT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    FOREIGN KEY(`typeUserId`) REFERENCES `typeUsers`(`id`)
);