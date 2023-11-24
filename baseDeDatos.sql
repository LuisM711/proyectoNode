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

insert  into `cargos`(`IDCargos`,`Cargos`) values 
(1,'Administrador'),
(2,'Director'),
(3,'Recursos Humanos'),
(4,'Empleado');

/*Table structure for table `descuentos` */

DROP TABLE IF EXISTS `descuentos`;

CREATE TABLE `descuentos` (
  `IDEmp` int NOT NULL,
  `Monto` float(8,0) NOT NULL,
  `Descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `descuentos` */

insert  into `descuentos`(`IDEmp`,`Monto`,`Descripcion`) values 
(3,546546,'dfgfd'),
(2,100000,'inversion largo plazo'),
(1,200000,'carro nuevo de agencia 2028'),
(3,354534,'fdg'),
(3,324,'gdfg');

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

insert  into `empleados`(`IDEmp`,`Nombre`,`ApellidoPaterno`,`ApellidoMaterno`,`Usuario`,`Contra`,`Alta`,`Direccion`,`Celular`,`Cargo`,`RFC`,`NSS`,`CURP`,`SueldoMensual`) values 
(1,'Luis Mario','Lopez','Reyes','luis74','1234',1,'Bosque de Olmos #1871','6682212485',1,'LORL031220DV7','39239','LORL031220HSLPYSA9',1002),
(2,'Ramon','Ruiz','Castro','ramon','12',1,'Mansion','6668882234',4,'3920320','9430340w','90ds90',20000),
(3,'Ana Gabriela','Zepeda','Ramirez','puppy92','1245',1,'Delicias','6683512874',1,'39394309','49340349','0s90fd90',30000),
(4,'Andrik','Gomez','Valdez','kirna09','0912',1,'Puente','6683273265',3,'2093290','3289398320','45654',4001);

/*Table structure for table `impuestos` */

DROP TABLE IF EXISTS `impuestos`;

CREATE TABLE `impuestos` (
  `nombre` varchar(50) NOT NULL,
  `porcentaje` float NOT NULL,
  `ultimaActualizacion` date NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `impuestos` */

insert  into `impuestos`(`nombre`,`porcentaje`,`ultimaActualizacion`) values 
('ISR',16,'2023-11-23'),
('IVA',11,'2023-11-23');

/*Table structure for table `peticionesprestamos` */

DROP TABLE IF EXISTS `peticionesprestamos`;

CREATE TABLE `peticionesprestamos` (
  `IDEmp` int NOT NULL,
  `Monto` float(10,2) NOT NULL,
  `Descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `peticionesprestamos` */

/* Function  structure for function  `getDeudaTotal` */

/*!50003 DROP FUNCTION IF EXISTS `getDeudaTotal` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `getDeudaTotal`(ID int) RETURNS decimal(10,0)
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

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `getDeudaTotalDetalle`(IN ID INT)
BEGIN
    SELECT MONTO, DESCRIPCION FROM descuentos WHERE IDEMP = ID order by MONTO asc;
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

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `descuentosview` AS select `descuentos`.`IDEmp` AS `IDEMP`,sum(`descuentos`.`Monto`) AS `DEUDA` from `descuentos` group by `descuentos`.`IDEmp` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
