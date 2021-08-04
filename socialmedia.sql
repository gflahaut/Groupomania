/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ socialmedia /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE socialmedia;

DROP TABLE IF EXISTS mails;
CREATE TABLE `mails` (
  `mailsid` smallint NOT NULL AUTO_INCREMENT,
  `sender` varchar(255) NOT NULL,
  ` recipient` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`mailsid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS posts;
CREATE TABLE `posts` (
  `idposts` int NOT NULL AUTO_INCREMENT,
  `postuserid` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `imageUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` varchar(1000) NOT NULL,
  PRIMARY KEY (`idposts`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'USER',
  `fonction` varchar(30) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO mails(mailsid,sender, recipient,subject,text) VALUES(3,'gflahaut@groupomania.com','jhudelle@groupomania.com','','');

INSERT INTO posts(idposts,postuserid,title,description,imageUrl,date,likes) VALUES(7,3,'Meilleurs Vœux','Après cette année éprouvante, nous espérons tous le meilleur pour l\'avenir et souhaitons remercier ceux qui nous ont soutenus. Nous voulons revenir à l\'essentiel et resserrer les liens. Meilleurs vœux','','2021-01-01 20:05:56','5,2,6,4'),(10,5,'Cocktail ! Cheers ! ','si cela intéresse quelqu\'un, je voudrais une compagnie pour boire un verre après notre dur travail pour décompresser !','','2021-07-31 20:13:59','1,3,2'),(2,2,'Vaccins','N\'oubliez pas le rappel pour les vaccins, une note de service en parle et je ne le savez pas donc au cas où, ne me remerciez pas c\'est cadeau','','2020-08-01 19:46:32','1,4,6'),(5,5,'règles de sécurité','excusez-moi mais avez-vous comme moi, pas été prévenu du contrôle des règles de sécurité j\'ai encore beaucoup de travail en retard j\'espère que c\'est une mauvaise blague !','','2021-07-31 20:21:41','1,6,5,2'),(12,2,'Code du travail','\"Une loi qui doit instituer de nouvelles libertés et de nouvelles protections\" qu\'ils disent mais pour qui ?','','2021-07-31 20:22:10','1,5,3');
INSERT INTO users(userId,username,password,name,firstname,email,role,fonction) VALUES(1,'jbonduelle','$2b$10$sxeeC3R7jlUrUPHaoXWIyO5nodHwZ/thA1F6lyP8BFfzHW.hUHG7e','Bonduelle','John','jbonduelle@groupomania.com','USER','assistant RH'),(3,'nlegrix','$2b$10$sxeeC3R7jlUrUPHaoXWIyO5nodHwZ/thA1F6lyP8BFfzHW.hUHG7e','legrix','naima','nlegrix@groupomania.com','USER','Assitante Commerciale'),(4,'gflahaut','$2b$10$3VUHG4Sy7fcriPHxNwp2ee/GsRx9kJQuI3YQaGZC3ERqftzrdtfeK','flahaut','gwendoline','gflahaut@groupomania.com','ADMIN','Développeuse Web'),(6,'jlacroix','$2b$10$3VUHG4Sy7fcriPHxNwp2ee/GsRx9kJQuI3YQaGZC3ERqftzrdtfeK','Lacroix','John','jlacroix@groupomania.com','USER','agent du S.A.V'),(7,'jdori','$2b$10$3VUHG4Sy7fcriPHxNwp2ee/GsRx9kJQuI3YQaGZC3ERqftzrdtfeK','Dori','John','jdori@groupomania.com','USER','Gestionnaire des stocks'),(11,'alia','$2b$10$O9j4gMlbOn2QGJjypgun1eDxzykt33Ry1fLLITYjayjrNIyQOK0v.','lali','lali','alai@gmail.com','USER',''),(8,'lgwen','$2b$10$tE6i217vmEip6WwYIMc8feWcr5f0./kOEh2DIeWsYUYtv1iRGiPHO','gwen','lili','fg@mail.com','USER',''),(9,'lala','$2b$10$IEU5YgigDaoijX0x8HfZsuyaR1yDr3aN3zNmTdkdbh2v26A3XSdPi','lili','dubois','lala@hotmail.fr','USER',''),(10,'totoro','$2b$10$QBy7y3jMQV93qbqRyyBD/u11wvCZZ701FLV6/kn24c0gr7RdBh9im','gerard','blanc','t@gmail.com','USER','');
