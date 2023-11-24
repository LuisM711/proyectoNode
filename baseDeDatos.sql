/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.2.0 : Database - nomina
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

/*Table structure for table `calculoisr` */

DROP TABLE IF EXISTS `calculoisr`;

CREATE TABLE `calculoisr` (
  `IDEmp` int NOT NULL,
  `IngresosGravados` float(8,0) NOT NULL,
  `LimiteInferior` float(8,0) NOT NULL,
  `ExcedenteLimiteInferior` float(8,0) NOT NULL,
  `tasa` float(8,0) NOT NULL,
  `ImpuestoMarginal` float(8,0) NOT NULL,
  `CuotaFija` float(8,0) NOT NULL,
  `ISRCausado` float(8,0) NOT NULL,
  `SubsidioEmplo` float(8,0) NOT NULL,
  `ISRRetenido` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`IDEmp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `calculoisr` */

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

/*Table structure for table `cuotaimss` */

DROP TABLE IF EXISTS `cuotaimss`;

CREATE TABLE `cuotaimss` (
  `IDEmp` int NOT NULL,
  `Excedente` float(8,0) NOT NULL,
  `PrestacionesConDinero` float(8,0) NOT NULL,
  `PrestacionEnEspecie` float(8,0) NOT NULL,
  `InvalidezYVida` float(8,0) NOT NULL,
  `CesandiaYVida` float(8,0) NOT NULL,
  `CuotaIMSS` float(8,0) NOT NULL,
  PRIMARY KEY (`IDEmp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cuotaimss` */

/*Table structure for table `datobancario` */

DROP TABLE IF EXISTS `datobancario`;

CREATE TABLE `datobancario` (
  `IDEmp` int NOT NULL,
  `SalarioDiario` float NOT NULL,
  `DiasLaborados` int NOT NULL,
  `SDI` float NOT NULL,
  `SueldoYSalario` float GENERATED ALWAYS AS ((`SalarioDiario` * `DiasLaborados`)) STORED,
  PRIMARY KEY (`IDEmp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `datobancario` */

insert  into `datobancario`(`IDEmp`,`SalarioDiario`,`DiasLaborados`,`SDI`) values 
(3,300,5,313.56),
(2,430,4,0),
(1,306,5,0);

/*Table structure for table `descuentos` */

DROP TABLE IF EXISTS `descuentos`;

CREATE TABLE `descuentos` (
  `IDEmp` int NOT NULL,
  `Monto` float(8,0) NOT NULL,
  `Descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `descuentos` */

insert  into `descuentos`(`IDEmp`,`Monto`,`Descripcion`) values 
(2,100000,'inversion largo plazo'),
(2,789,'mongtromo'),
(2,666,'444'),
(2,567,'montooo'),
(2,123,'modsnfj'),
(2,213143,'dsdf'),
(1,20000,'invertir');

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
(1,'Luis Mario','Lopez','Reyes','luis74','1234',1,'Bosque de Olmos #1871','6682212485',1,'LORL031220DV7','39239','LORL031220HSLPYSA9',1000),
(2,'Ramon','Ruiz','Castro','ramon','12',1,'Mansion','6668882234',4,'3920320','9430340w','90ds90',20000),
(3,'Ana Gabriela','Zepeda','Ramirez','puppy92','1245',1,'Delicias','6683512874',1,'39394309','49340349','0s90fd90',30001),
(4,'Andrik','Gomez','Valdez','kirna09','0912',1,'Puente','6683273265',3,'2093290','3289398320','90c0c90d0',4000);

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
('ISR',20,'2023-11-23'),
('IVA',16,'2023-11-23');

/*Table structure for table `peticionesprestamos` */

DROP TABLE IF EXISTS `peticionesprestamos`;

CREATE TABLE `peticionesprestamos` (
  `IDEmp` int NOT NULL,
  `Monto` float(10,2) NOT NULL,
  `Descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `peticionesprestamos` */

/*Table structure for table `porcentajesimss` */

DROP TABLE IF EXISTS `porcentajesimss`;

CREATE TABLE `porcentajesimss` (
  `Excedente` float(8,0) NOT NULL,
  `PrestacionesEnDinero` float(8,0) NOT NULL,
  `PrestacionesEnEspecie` float(8,0) NOT NULL,
  `InvalidezYVida` float(8,0) NOT NULL,
  `CensatiaYVejez` float(8,0) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `porcentajesimss` */

/*Table structure for table `sdi` */

DROP TABLE IF EXISTS `sdi`;

CREATE TABLE `sdi` (
  `SDI` float NOT NULL,
  `Fecha` date NOT NULL,
  `columna` int NOT NULL,
  PRIMARY KEY (`columna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `sdi` */

insert  into `sdi`(`SDI`,`Fecha`,`columna`) values 
(1.0452,'2010-10-23',1);

/*Table structure for table `tasaisrquincenal` */

DROP TABLE IF EXISTS `tasaisrquincenal`;

CREATE TABLE `tasaisrquincenal` (
  `LimiteInferior` float NOT NULL,
  `LimiteSuperior` float NOT NULL,
  `CuotaFija` float NOT NULL,
  `PorcentajeExcedente` float NOT NULL,
  `columna` int NOT NULL,
  PRIMARY KEY (`columna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tasaisrquincenal` */

insert  into `tasaisrquincenal`(`LimiteInferior`,`LimiteSuperior`,`CuotaFija`,`PorcentajeExcedente`,`columna`) values 
(0.01,285.45,0,0.0192,1),
(285.46,2422.8,5.55,0.64,2),
(2422.81,4257.9,142.2,0.1088,3),
(4257.91,4949.55,341.85,0.16,4),
(4949.56,5925.9,452.55,0.1792,5),
(5925.91,11951.8,627.6,0.2136,6),
(11951.9,18837.8,1914.75,0.2352,7),
(18837.8,35964.3,3534.3,0.3,8),
(35964.3,47952.3,8672.25,0.32,9),
(49952.3,143857,12508.3,0.34,10),
(143857,0,45115.9,0.35,11);

/*Table structure for table `tasasubsidioempleado` */

DROP TABLE IF EXISTS `tasasubsidioempleado`;

CREATE TABLE `tasasubsidioempleado` (
  `IngresoDesde` float NOT NULL,
  `IngresoHasta` float NOT NULL,
  `Subsidio` float NOT NULL,
  `columna` int NOT NULL,
  PRIMARY KEY (`columna`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tasasubsidioempleado` */

insert  into `tasasubsidioempleado`(`IngresoDesde`,`IngresoHasta`,`Subsidio`,`columna`) values 
(0.01,872.85,200.85,1),
(872.86,1309.2,200.7,2),
(1309.2,1713.6,200.7,3),
(1713.61,1745.7,193.8,4),
(1745.71,2193.75,188.7,5),
(2193.76,2327.55,174.75,6),
(2327.56,2632.65,160.35,7),
(2632.66,3071.4,145.35,8),
(3071.41,3510.15,125.1,9),
(3510.16,3642.6,107.4,10),
(3642.61,0,0,11);

/*Table structure for table `uma` */

DROP TABLE IF EXISTS `uma`;

CREATE TABLE `uma` (
  `uma` float NOT NULL,
  `Fecha` date NOT NULL,
  `umacol` int NOT NULL,
  PRIMARY KEY (`umacol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `uma` */

insert  into `uma`(`uma`,`Fecha`,`umacol`) values 
(80.6,'2015-10-23',0);

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
