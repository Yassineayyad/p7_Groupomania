-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: database_development_groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUSERS` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,4,'je suis nouveau ',NULL,'2021-11-04 11:47:10','2021-11-04 11:47:10',NULL),(2,4,'merci sin de m\'avoir debloquer c\'etait con en plus ',NULL,'2021-11-04 11:48:26','2021-11-04 11:48:26',NULL),(3,4,'zadazd',NULL,'2021-11-04 13:42:35','2021-11-04 13:42:35',NULL),(4,4,'je suis nouveau sur le site ',NULL,'2021-11-04 13:44:04','2021-11-04 13:44:04',NULL),(5,4,'Groiupomania',NULL,'2021-11-04 14:42:11','2021-11-04 14:42:11',NULL),(6,4,'salut a tous <3',NULL,'2021-11-05 11:03:11','2021-11-05 11:03:11',NULL),(7,4,'salut a tous je viens de finir et améliorer ma page d\'accueil  ',NULL,'2021-11-05 11:35:11','2021-11-05 11:35:11',NULL),(8,4,'coucou',NULL,'2021-11-05 11:37:37','2021-11-05 11:37:37',NULL),(9,5,'bienvenu a vous ',NULL,'2021-11-05 11:39:23','2021-11-05 11:39:23',NULL),(14,4,'hello',NULL,'2021-11-08 12:20:36','2021-11-08 12:20:36',NULL),(15,4,'hello',NULL,'2021-11-08 12:22:08','2021-11-08 12:22:08',NULL),(16,5,'bonjour','0','2021-11-08 15:11:55','2021-11-08 15:11:55',NULL),(19,5,'test',NULL,'2021-11-08 15:34:32','2021-11-08 15:34:32',NULL),(21,5,'',NULL,'2021-11-08 15:37:19','2021-11-08 15:37:19',NULL),(23,5,'yooo','http://localhost:3000/images/undefined','2021-11-08 15:53:51','2021-11-08 15:53:51',NULL),(25,5,'bonjour a tous','http://localhost:3000/images/463476.jpg1636388684256.jpg','2021-11-08 16:24:44','2021-11-08 16:24:44',NULL),(26,1,'bonjour','http://localhost:3000/images/Sans_titre-DESKTOP-ETA61E1.png1636455957955.png','2021-11-09 11:05:57','2021-11-09 11:05:57',NULL),(42,7,'coucou les amis','http://localhost:3000/images/image.png1637318927624.png','2021-11-15 10:51:52','2021-11-19 11:01:56',NULL),(43,7,'updated','http://localhost:3000/images/108-1089579_png-file-road-icon-png.png1637319758318.png','2021-11-15 10:51:58','2021-11-19 11:02:38',NULL),(52,15,'problem','http://localhost:3000/images/391df2ce8d9e8dedb179310a22e1ebc3.gif1637158781024.undefined','2021-11-17 14:19:41','2021-11-17 14:19:48',NULL),(59,12,'dadze','http://localhost:3000/images/image.png1637666925740.png','2021-11-23 11:28:45','2021-11-23 11:28:45',52),(60,12,'superbe photo',NULL,'2021-11-23 11:31:46','2021-11-23 11:31:46',52),(61,12,'superbe photo',NULL,'2021-11-23 11:32:14','2021-11-23 11:32:14',52),(62,12,'belle photo','http://localhost:3000/images/5806d68860855f6fa35f636801daed11.jpg1637667142834.jpg','2021-11-23 11:32:22','2021-11-23 11:32:22',52),(63,17,'hello ',NULL,'2021-11-25 11:08:58','2021-11-25 11:08:58',NULL),(64,18,'coucou test',NULL,'2021-11-25 11:14:12','2021-11-25 11:14:12',NULL),(65,19,'Bonjour je suis brad Pitt et je suis content de traviller chez groupomania ! ','http://localhost:3000/images/téléchargement.jpg1637842092681.jpg','2021-11-25 11:56:53','2021-11-25 12:08:12',NULL),(67,5,'bonjour',NULL,'2021-11-25 15:46:00','2021-11-25 15:46:00',NULL),(70,12,'hello Brad',NULL,'2021-11-25 19:30:53','2021-11-25 19:30:53',69),(71,12,'bonjour admin',NULL,'2021-11-25 19:31:13','2021-11-25 19:31:13',67),(72,15,'Oh !je travail dans la même entreprise que Brad Pitt!',NULL,'2021-11-25 20:34:17','2021-11-25 20:34:17',65),(74,12,'j\'aime le tabasco',NULL,'2021-11-27 12:10:45','2021-11-27 12:10:45',73),(75,12,'test',NULL,'2021-11-27 12:11:39','2021-11-27 12:11:39',73),(76,12,'c\'est bon le tabasco mai je prefere cette sauce','http://localhost:3000/images/pripri.jpg1638015142246.jpg','2021-11-27 12:12:22','2021-11-27 12:12:22',73),(77,12,'bonjour a tous je vous conseil cette sauce','http://localhost:3000/images/pripri.jpg1638189969507.jpg','2021-11-27 12:24:08','2021-11-29 12:46:09',NULL),(82,8,'hello',NULL,'2021-11-29 17:03:04','2021-11-29 17:03:04',77),(83,7,'hello',NULL,'2021-11-29 17:15:35','2021-11-29 17:15:35',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20211103101117-create-user.js'),('20211103101126-create-post.js'),('20211111135520-create-like.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(250) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yassine1@groupomania.com','maeva','ayyad','$2b$10$qxEJCogE4Fz06gyvLxzloOluYXHwWYzS8wGguDgGbNf1NggUfYA86','http://localhost:3000/images/image.png1636555155534.png',0,'2021-11-03 10:34:36','2021-11-10 14:39:15'),(3,'deleted-user3@groupomania.com','ayyad','Yassine','$2b$10$0WDwQVkypDg55mUzVlfMV.z.dF/Bbg0vJ8Z1cpYWY5hWAUXfznI4i',NULL,0,'2021-11-03 10:56:02','2021-11-08 16:56:03'),(4,'deleted-user4@groupomania.com','ayyad','Yassine','$2b$10$PlARXHUtMvXjDkJ6ukfwA.qQkUSDBIp/u0bpy67TPG6cEnpNSxZIG','http://localhost:3000/images/image.png1636373769944.png',0,'2021-11-03 11:13:53','2021-11-08 15:05:06'),(5,'admin@groupomania.com','Admin','Admin','$2b$10$v07wv9buZtw.cd66ZKCoweJ3VAwz3sJGn7gHhsPM7hufwfwNO0h.S','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',1,'2021-11-05 11:38:49','2021-11-05 11:38:49'),(6,'yassine2@groupomania.com','Ayyad','Yassine','$2b$10$iStFBSMWAhpqLClV8BZlruIgU8JNQbJNehEUVnrdaxfY7.JNPD8eq','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-09 11:20:15','2021-11-09 11:20:15'),(7,'yassine10@groupomania.com','mae','Ayyad','$2b$10$as9DdhRcwftvauIJDZZtDuEHF7wX1sXCiS8eR.VwICnNg3KhsOhvS','http://localhost:3000/images/765-default-avatar.png1638024290236.png',0,'2021-11-09 11:22:32','2021-11-27 14:44:50'),(8,'deleted-user8@groupomania.com','Utilisateur','Supprimé','$2b$10$BRRIam5cbBlp.gsOxZa7EeqjwUCz8icb46rZv9h0kUj3zBc2jPAZi','http://localhost:3000/images/téléchargement.jpg1638205369074.jpg',0,'2021-11-09 11:30:44','2021-11-29 17:03:10'),(9,'yassine0@groupomania.com','yassine','ayyad','$2b$10$t5JocX2Zyj4ZqJwoHfF1wezAtxudoMTHichbgJI1URVeA6F8KZK4q','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-09 11:33:25','2021-11-09 11:33:25'),(11,'yassine3@groupomania.com','ayyad','Yassine','$2b$10$adoE.lejMo.qjO8lhgeIceUVrYLjM5xEmA9XQxy/oqlLiHcMSk716','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-11 15:35:43','2021-11-11 15:35:43'),(12,'yassine@groupomania.com','Ayyad','Yassine','$2b$10$45q1u77DhY0gFWz.JDQHcuIcJm.H3oReIIYDNg5QFLTD0kEoU2zbS','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-17 11:12:54','2021-11-17 11:12:54'),(13,'test@test.com','test','test','$2b$10$7Q1e9P8CSEhDcseXV2c//eUBXEtBGPomsHyTWL6gyig5YieNTOxce','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-17 11:15:54','2021-11-17 11:15:54'),(14,'test.test@test.com','ayyad','yassine','$2b$10$hW3OOg3SSR9ma2WPuY8n8OYXbLfPKm41sO6.mXQ.AGgrP9gasTcZK','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-17 11:21:13','2021-11-17 11:21:13'),(15,'omar@groupomania.com','Diop','Omar','$2b$10$ZFRNVp5cgV7QrDgyNJpoqentD2d3finXDzX.GsmSJ0MH3FkH0/Jre','http://localhost:3000/images/icon-left-font-monochrome-black.png1637154819896.png',0,'2021-11-17 11:21:55','2021-11-17 13:13:39'),(16,'deleted-user16@groupomania.com','nom','prenom','$2b$10$w.LZTXSyhDf15WLXg5Ka5uZF9Den7WZVMqkjIT5l/i61E8Gu2MuP.','http://localhost:3000/images/image.png1637492544993.png',0,'2021-11-21 11:01:47','2021-11-21 11:06:51'),(17,'deleted-user17@groupomania.com','Ayyad','Test','$2b$10$nhBz7CaZopkugCUwNN8G.uBcs7Scn.Wu7TR1eL.R89IrDRsk0bOEG','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-25 11:08:44','2021-11-25 11:09:04'),(18,'deleted-user18@groupomania.com','Utilisateur','Supprimé','$2b$10$SC//6pRjnh1Ao4pbHe4KW.ynNfNMhti8l4/0B883dGupnEuwlbvF.','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-25 11:14:00','2021-11-25 11:14:22'),(19,'yassine.ayyad@groupomania.com','Brad','Pitt','$2b$10$SyGGc4KvE1lcShiEzSx.BOlkeV0FE6IGx4pO1sGbr7JO2C2H2jn.y','http://localhost:3000/images/téléchargement.jpg1637842112439.jpg',0,'2021-11-25 11:53:42','2021-11-25 12:08:32'),(20,'test2@test.com','test2','test2','$2b$10$RPpCi8F1cKkHYXamM77YKOlDKIjOKVc4NH0nWkjWbjOHi61R86tJG','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-27 15:32:57','2021-11-27 15:32:57'),(24,'deleted-user24@groupomania.com','Utilisateur','Supprimé','4mu0y33p','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-29 16:51:29','2021-11-29 17:23:02'),(28,'azazeazeaz@eazeazeaz.com','Yas','dfefaz','$2b$10$HUZSkRJWCvPIpnHQZIsdL.dFrBfDXza62hD/tywSfOgLVrZqV9XbC','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-29 16:53:42','2021-11-29 16:53:42'),(34,'fezf@dazdaz.com','aea','zaeae','$2b$10$GpvMPUAgqow/SSxLEygpI.U/YBZyVxX5FA0axYUnvs1QgDypAsWdy','http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png',0,'2021-11-29 16:55:04','2021-11-29 16:55:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-29 22:05:19
