-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 35.198.237.137    Database: chaocarhub
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `car_code` varchar(255) NOT NULL,
  `car_brand` varchar(255) DEFAULT NULL,
  `car_model` varchar(255) DEFAULT NULL,
  `car_img` varchar(255) DEFAULT NULL,
  `car_seat` int DEFAULT NULL,
  `car_bag` int DEFAULT NULL,
  `car_rentprice` int DEFAULT NULL,
  `car_status` varchar(255) DEFAULT "Available",
  PRIMARY KEY (`car_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'T001','Toyota','Yaris','\\uploads\\myImageCar-1682493360238.png',4,2,1190,"Available"),(2,'T002','Toyota','Fortuner','\\uploads\\myImageCar-1682493311924.png',7,3,1990,"Available"),(3,'T003','Toyota','Camry','\\uploads\\myImageCar-1682493239746.png',4,2,1850,"Available"),(4,'T004','Toyota','Alphard','\\uploads\\myImageCar-1682493090589.png',7,5,9900,"Available"),(5,'T005','Toyota','Commuter','\\uploads\\myImageCar-1682492982015.png',9,5,3000,"Available"),(6,'N001','Nissan','Almera','\\uploads\\myImageCar-1682492925689.png',5,1,1490,"Available"),(7,'N002','Nissan','March','\\uploads\\myImageCar-1682492872122.png',4,1,975,"Available"),(8,'N003','Nissan','Kicks','\\uploads\\myImageCar-1682492787178.png',5,1,2190,"Available"),(9,'N004','Nissan','Leaf','\\uploads\\myImageCar-1682492684106.png',4,1,2190,"Available"),(10,'N005','Nissan','Teana','\\uploads\\myImageCar-1682485397029.png',4,1,5090,"Available"),(11,'N006','Nissan','Urvan','\\uploads\\myImageCar-1682485225305.png',9,5,9900,"Available"),(12,'H001','Honda','City','\\uploads\\myImageCar-1682485161173.png',4,1,1259,"Available"),(13,'H002','Honda','BRV','\\uploads\\myImageCar-1682485072343.png',5,3,2799,"Available"),(14,'H003','Honda','Civic','\\uploads\\myImageCar-1682485008456.png',5,2,1579,"Available"),(15,'B001','Mercedes','Benz Sport','\\uploads\\myImageCar-1682484896797.png',2,2,10900,"Available"),(16,'H001','Hyundai','H1','\\uploads\\myImageCar-1682484781324.png',7,3,3300,"Available"),(17,'MG001','MG','HS','\\uploads\\myImageCar-1682484598998.png',7,2,2550,"Available"),(56,'BMW001','BMW','Series 7','\\uploads\\myImageCar-1682500863349.png',4,2,15000,"Available");
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `pay_id` int NOT NULL AUTO_INCREMENT,
  `pay_cr_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pay_cr_num` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pay_cr_exp` date NOT NULL,
  `pay_cr_cvc` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pay_status` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pay_time` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `r_id` int DEFAULT NULL,
  `u_id` int DEFAULT NULL,
  PRIMARY KEY (`pay_id`),
  KEY `r_id_fk_idx` (`r_id`),
  KEY `u_id_fk_idx` (`u_id`),
  CONSTRAINT `pay_r_id_fk` FOREIGN KEY (`r_id`) REFERENCES `rental` (`r_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pay_u_id_fk` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rental`
--

DROP TABLE IF EXISTS `rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental` (
  `r_id` int NOT NULL AUTO_INCREMENT,
  `r_time_pickup` time DEFAULT NULL,
  `r_day_pickup` date DEFAULT NULL,
  `r_time_return` time DEFAULT NULL,
  `r_day_return` date DEFAULT NULL,
  `r_place_pickup` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `r_place_return` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `r_status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `car_id` int NOT NULL,
  `u_id` int NOT NULL,
  `r_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `r_amountdays` int DEFAULT NULL,
  `r_totalprice` int DEFAULT NULL,
  PRIMARY KEY (`r_id`),
  KEY `u_id_fk_idx` (`u_id`),
  KEY `car_id_idx` (`car_id`),
  CONSTRAINT `r_car_id_fk` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `r_u_id_fk` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rental`
--

LOCK TABLES `rental` WRITE;
/*!40000 ALTER TABLE `rental` DISABLE KEYS */;
INSERT INTO `rental` VALUES (87,'15:20:00','2023-05-23','16:20:00','2023-05-26','สนามบินสุวรรณภูมิ','สถานีรถไฟดอนเมือง','checkout',9,26,'2023-05-21 16:20:34',3,6570),(90,'14:54:00','2023-05-23','15:54:00','2023-05-24','เซ็นทรัล พระราม 2','แฟชั่น ไอซ์แลนด์','checkout',10,24,'2023-05-21 16:54:38',1,5090),(95,'04:06:00','2023-05-25','04:06:00','2023-05-26','แฟชั่น ไอซ์แลนด์','เซ็นทรัล อีสต์วิลล์','checkout',2,24,'2023-05-21 17:07:51',1,1990),(96,'03:08:00','2023-05-24','05:08:00','2023-05-27','เซ็นทรัล พระราม 2','เซ็นทรัล พระราม 2','checkout',7,24,'2023-05-21 17:08:23',3,2925);
/*!40000 ALTER TABLE `rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_car`
--

DROP TABLE IF EXISTS `return_car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_car` (
  `re_id` int NOT NULL AUTO_INCREMENT,
  `r_id` int NOT NULL,
  `re_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `re_status` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`re_id`),
  KEY `re_r_id_fk_idx` (`r_id`),
  CONSTRAINT `re_r_id_fk` FOREIGN KEY (`r_id`) REFERENCES `rental` (`r_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_car`
--

LOCK TABLES `return_car` WRITE;
/*!40000 ALTER TABLE `return_car` DISABLE KEYS */;
/*!40000 ALTER TABLE `return_car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `t_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `u_id` int NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  KEY `t_u_id_fk_idx` (`u_id`),
  CONSTRAINT `t_u_id_fk` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (4,24,'Ikawu9GhRxXs@bx!9!T6dfyv4Y!3bSEaj8tZ$dyJVH7-Db=B$UP@Wl82hONbxAJwtZi1n3-U/*Az!M!pMR/J&cfK1g*fa$wd9trd'),(5,25,'WXRQ3eqIen@&mhz#vL*mK=qN1$Sm8bg4RspU#I2=UIXX48t/B6MYn1mH19ICt-Kfz3cLcW66nZ*0!Xv^$G20j2/LGa44Y#b*9X8!'),(6,26,'ussvWLsw/BXVzKQaT0Jh$0/hyMj9K*rJUy2ER$3@&Ba=DsYyzO9T2^aPucrHroPqtgohS##KSy^o3z5Mdr*Er&Wc^Xg-AjCC8qFJ'),(7,29,'CbMiCyUfbJ3MZM$lmp67xudsRspQTiJZnpGWmiLIup&v8-wmm-q#lvB0IOY-qxIA/eh@2prTEC3$5zkQ60RsvStuSmZkfZ*=sFwg');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `u_username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `u_fname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `u_lname` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `u_pass` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `u_phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `u_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (24,'chompoo','ดวงกมล','พบสูงเนิน','$2b$10$7x5CzolYGcw1hjveo9KeyODPFtIpR.9EgJft708xYEfPos7Nx.XxW','0624965299','abc@gmaill.com','user'),(25,'admin','ดวงกมล','พบสูงเนิน','$2b$10$rGLZwjofnmOvjZ7wNX/ABusdEWaZawVr/Tyx9.1Uf75HZTUtHOrNe','0624965879','abc@gmail.com','admin'),(26,'opal','Tadporn','Tannarat','$2b$10$uncvGgRtJR.3esw2y0r99.vrBPc5HqtPcQTWB/4uLCFcEqjyzmvSG','0639514269','64070153@KMITL.AC.TH','user'),(28,'chompoo555','Tadporn','Tannarat','$2b$10$dN.EHnMxxTQtKQsPnz1j3uFfRIBNxc6kMZHh6vL9o1vwfpizZM4YC','0639514269','64070153@KMITL.AC.TH','user'),(29,'chompoo55','Tadporn','Tannarat','$2b$10$X8dW.dkM/iyEKw56ebt7w.OMjAa.1HTn4ftQU1Dcgst9fNG2bwvlu','0639514269','64070153@KMITL.AC.TH','user'),(30,'opallla','Tadporn','Tannarat','$2b$10$3e9/aJmLq12OrHGPPCXhaetHRkRn68xBvH3QNgo6xCvnTmbP0A9dq','0639514269','640701@KMITL.AC.TH','user'),(31,'baaaaa','Tadporn','Tannarat','$2b$10$.bXpbgmIH23f4GMQl3vkqOpswZSKP7Ak/iMIIBVX4Q5sPGx5wCn3W','0639514269','64070153@KMITL.AC.TH','user'),(32,'haaaaaa','Tadporn','Tannarat','$2b$10$9WZ98Mn2.gvD0Tp3C05xdeck8JlUQV0PW1/dexL4drcmNoNwQxlR.','0639514269','64070153@KMITL.AC.TH','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-03 20:56:01
