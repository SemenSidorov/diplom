SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `diplom` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `diplom`;

DROP TABLE IF EXISTS `elements`;
CREATE TABLE IF NOT EXISTS `elements` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IBLOCK_ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `SECTION_ID` int(11) DEFAULT NULL,
  `PREVIEW_PICTURE` varchar(100) DEFAULT NULL,
  `PREVIEW_TEXT` text DEFAULT NULL,
  `DETAIL_TEXT` text DEFAULT NULL,
  `DATE_START` int(11) NOT NULL,
  `DATE_EXP` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

INSERT INTO `elements` (`ID`, `IBLOCK_ID`, `NAME`, `SECTION_ID`, `PREVIEW_PICTURE`, `PREVIEW_TEXT`, `DETAIL_TEXT`, `DATE_START`, `DATE_EXP`) VALUES
(1, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 1, 0),
(2, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 2, 0),
(3, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 3, 0),
(4, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 0, 0),
(5, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 0, 0),
(6, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 0, 0),
(7, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 0, 0),
(8, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 0, 0),
(9, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 0, 0),
(10, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 0, 0),
(11, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 0, 0),
(12, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 0, 0),
(13, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 0, 0),
(14, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 0, 0),
(15, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd', 0, 0),
(16, 2, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv', 10, 20);

DROP TABLE IF EXISTS `ibocks`;
CREATE TABLE IF NOT EXISTS `ibocks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `ibocks` (`ID`, `NAME`) VALUES
(1, 'news'),
(2, 'events');

DROP TABLE IF EXISTS `properties`;
CREATE TABLE IF NOT EXISTS `properties` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PARENT_ID` int(11) NOT NULL,
  `VALUE` varchar(20000) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `sections`;
CREATE TABLE IF NOT EXISTS `sections` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IBLOCK_ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(100) NOT NULL,
  `VALUE` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

INSERT INTO `test` (`ID`, `NAME`, `VALUE`) VALUES
(4, 'BOBA', 'fdgsdfgadfgksdfjgkjcvkxzcnvm,ajsldfj'),
(7, 'SHREK', 'asdfadsfljelqwfamndskzc'),
(8, 'TROLOLO', 'lolkek'),
(11, 'afsdasdfaasdf', 'asdfasdfasdf'),
(12, 'asdfasdfasdf', 'asdfasdfasdf'),
(13, 'afsdasdfaasdf', 'asdfasdfasdf'),
(14, 'asdfasdfasdf', 'asdfasdfasdf');

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LOGIN` varchar(30) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `TOKEN` varchar(255) DEFAULT NULL,
  `LAST_AUTH` int(11) NOT NULL,
  `IS_ADMIN` tinyint(1) DEFAULT NULL,
  `NAME` varchar(30) DEFAULT NULL,
  `LAST_NAME` varchar(50) DEFAULT NULL,
  `MIDDLE_NAME` varchar(50) DEFAULT NULL,
  `GROUP_NUMBER` int(10) DEFAULT NULL,
  `CREDIT_BOOK_NUMBER` int(10) DEFAULT NULL,
  `PHONE_NUMBER` varchar(13) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `PREVIEW_PICTURE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `users` (`ID`, `LOGIN`, `PASSWORD`, `TOKEN`, `LAST_AUTH`, `IS_ADMIN`, `NAME`, `LAST_NAME`, `MIDDLE_NAME`, `GROUP_NUMBER`, `CREDIT_BOOK_NUMBER`, `PHONE_NUMBER`, `EMAIL`, `PREVIEW_PICTURE`) VALUES
(1, 'biba', '$2y$10$0EGkfJ/f/Jshz7EbnvrR/OAbeRYQRd2NN8cQa05ELlLMIavZlrFkm', NULL, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '');

DROP TABLE IF EXISTS `users_events`;
CREATE TABLE IF NOT EXISTS `users_events` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `EVENT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
