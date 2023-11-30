/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.0.33 : Database - nomina
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nomina` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `nomina`;

/*Table structure for table `cargos` */

DROP TABLE IF EXISTS `cargos`;

CREATE TABLE `cargos` (
  `IDCargos` int NOT NULL,
  `Cargos` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`IDCargos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cargos` */

LOCK TABLES `cargos` WRITE;

insert  into `cargos`(`IDCargos`,`Cargos`) values 
(1,'Administrador'),
(2,'Director'),
(3,'Recursos Humanos'),
(4,'Empleado');

UNLOCK TABLES;

/*Table structure for table `descuentos` */

DROP TABLE IF EXISTS `descuentos`;

CREATE TABLE `descuentos` (
  `IDEmp` int NOT NULL,
  `Monto` float(8,0) NOT NULL,
  `Descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `descuentos` */

LOCK TABLES `descuentos` WRITE;

UNLOCK TABLES;

/*Table structure for table `empleados` */

DROP TABLE IF EXISTS `empleados`;

CREATE TABLE `empleados` (
  `IDEmp` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ApellidoPaterno` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ApellidoMaterno` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Usuario` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Contra` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Alta` tinyint(1) NOT NULL DEFAULT '1',
  `Direccion` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Celular` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Cargo` int NOT NULL,
  `RFC` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `NSS` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CURP` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `SueldoMensual` float DEFAULT NULL,
  PRIMARY KEY (`IDEmp`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `empleados` */

LOCK TABLES `empleados` WRITE;

insert  into `empleados`(`IDEmp`,`Nombre`,`ApellidoPaterno`,`ApellidoMaterno`,`Usuario`,`Contra`,`Alta`,`Direccion`,`Celular`,`Cargo`,`RFC`,`NSS`,`CURP`,`SueldoMensual`) values 
(1,'Luis Mario','Lopez','Reyes','luis74','1234',1,'Bosque de Olmos #1871','6682212485',1,'LORL031220DV7','39239','LORL031220HSLPYSA9',10000),
(2,'Ramon','Ruiz','Castro','ramon','12',1,'Mansion','6668882234',1,'3920320','9430340w','90ds90',20000),
(3,'Ana Gabriela','Zepeda','Ramirez','puppy92','1245',1,'Delicias','6683512874',1,'39394309','49340349','0s90fd90',30000),
(4,'Andrik','Gomez','Valdez','kirna09','0912',1,'Puente','6683273265',3,'2093290','3289398320','45654',40000);

UNLOCK TABLES;

/*Table structure for table `impuestos` */

DROP TABLE IF EXISTS `impuestos`;

CREATE TABLE `impuestos` (
  `nombre` varchar(50) NOT NULL,
  `porcentaje` float NOT NULL,
  `ultimaActualizacion` date NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `impuestos` */

LOCK TABLES `impuestos` WRITE;

insert  into `impuestos`(`nombre`,`porcentaje`,`ultimaActualizacion`) values 
('ISR',10,'2023-11-29'),
('IVA',16,'2023-11-23');

UNLOCK TABLES;

/*Table structure for table `peticionesprestamos` */

DROP TABLE IF EXISTS `peticionesprestamos`;

CREATE TABLE `peticionesprestamos` (
  `IDEmp` int NOT NULL,
  `Monto` float(10,2) NOT NULL,
  `Descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `peticionesprestamos` */

LOCK TABLES `peticionesprestamos` WRITE;

UNLOCK TABLES;

/* Function  structure for function  `getDeudaTotal` */

/*!50003 DROP FUNCTION IF EXISTS `getDeudaTotal` */;
DELIMITER $$

/*!50003 CREATE FUNCTION `getDeudaTotal`(ID int) RETURNS decimal(10,0)
    DETERMINISTIC
begin
	declare deudaTotal decimal;
	select sum(monto) into deudaTotal from descuentos where idemp = ID;
	If deudaTotal is null then
		set deudaTotal = 0.00;
	end if;
	return deudaTotal;
end */$$
DELIMITER ;

/* Procedure structure for procedure `getDeudaTotalDetalle` */

/*!50003 DROP PROCEDURE IF EXISTS  `getDeudaTotalDetalle` */;

DELIMITER $$

/*!50003 CREATE PROCEDURE `getDeudaTotalDetalle`(IN ID INT)
BEGIN
    SELECT IDEmp, Monto, Descripcion
    FROM descuentos
    WHERE IDEmp = ID;
END */$$
DELIMITER ;

/*Table structure for table `descuentosview` */

DROP TABLE IF EXISTS `descuentosview`;

/*!50001 DROP VIEW IF EXISTS `descuentosview` */;
/*!50001 DROP TABLE IF EXISTS `descuentosview` */;

/*!50001 CREATE TABLE  `descuentosview`(
 `IDEMP` int ,
 `DEUDA` double(17,0) 
)*/;

/*View structure for view descuentosview */

/*!50001 DROP TABLE IF EXISTS `descuentosview` */;
/*!50001 DROP VIEW IF EXISTS `descuentosview` */;

/*!50001 CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `descuentosview` AS select `descuentos`.`IDEmp` AS `IDEMP`,sum(`descuentos`.`Monto`) AS `DEUDA` from `descuentos` group by `descuentos`.`IDEmp` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
