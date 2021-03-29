-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 29 2021 г., 21:13
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `diplom`
--

-- --------------------------------------------------------

--
-- Структура таблицы `elements`
--

CREATE TABLE `elements` (
  `ID` int(11) NOT NULL,
  `IBLOCK_ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `SECTION_ID` int(11) DEFAULT NULL,
  `PREVIEW_PICTURE` varchar(100) DEFAULT NULL,
  `PREVIEW_TEXT` text DEFAULT NULL,
  `DETAIL_TEXT` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `elements`
--

INSERT INTO `elements` (`ID`, `IBLOCK_ID`, `NAME`, `SECTION_ID`, `PREVIEW_PICTURE`, `PREVIEW_TEXT`, `DETAIL_TEXT`) VALUES
(1, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(2, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(3, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(4, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(5, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(6, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(7, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(8, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(9, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(10, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(11, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(12, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(13, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(14, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv'),
(15, 1, 'lol', NULL, ';sdlkjf;dfsl', 'j;ldhf;ajsfk;dlk', 'kjhalfkjghsfdlkjghsd'),
(16, 1, 'kek', NULL, 'kjsdhfglskjfgh', 'sjkdjfhlkgjshdflg', 'fgpoieurpfkv');

-- --------------------------------------------------------

--
-- Структура таблицы `ibocks`
--

CREATE TABLE `ibocks` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ibocks`
--

INSERT INTO `ibocks` (`ID`, `NAME`) VALUES
(1, 'news');

-- --------------------------------------------------------

--
-- Структура таблицы `properties`
--

CREATE TABLE `properties` (
  `ID` int(11) NOT NULL,
  `PARENT_ID` int(11) NOT NULL,
  `VALUE` varchar(20000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sections`
--

CREATE TABLE `sections` (
  `ID` int(11) NOT NULL,
  `IBLOCK_ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `test`
--

CREATE TABLE `test` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `VALUE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `test`
--

INSERT INTO `test` (`ID`, `NAME`, `VALUE`) VALUES
(4, 'BOBA', 'fdgsdfgadfgksdfjgkjcvkxzcnvm,ajsldfj'),
(7, 'SHREK', 'asdfadsfljelqwfamndskzc'),
(8, 'TROLOLO', 'lolkek'),
(11, 'afsdasdfaasdf', 'asdfasdfasdf'),
(12, 'asdfasdfasdf', 'asdfasdfasdf'),
(13, 'afsdasdfaasdf', 'asdfasdfasdf'),
(14, 'asdfasdfasdf', 'asdfasdfasdf');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `LOGIN` varchar(30) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `IS_ADMIN` tinyint(1) DEFAULT NULL,
  `NAME` varchar(30) DEFAULT NULL,
  `LAST_NAME` varchar(50) DEFAULT NULL,
  `MIDDLE_NAME` varchar(50) DEFAULT NULL,
  `GROUP_NUMBER` int(10) DEFAULT NULL,
  `CREDIT_BOOK_NUMBER` int(10) DEFAULT NULL,
  `PHONE_NUMBER` varchar(13) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`ID`, `LOGIN`, `PASSWORD`, `IS_ADMIN`, `NAME`, `LAST_NAME`, `MIDDLE_NAME`, `GROUP_NUMBER`, `CREDIT_BOOK_NUMBER`, `PHONE_NUMBER`, `EMAIL`) VALUES
(1, 'biba', '$2y$10$0EGkfJ/f/Jshz7EbnvrR/OAbeRYQRd2NN8cQa05ELlLMIavZlrFkm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `ibocks`
--
ALTER TABLE `ibocks`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `elements`
--
ALTER TABLE `elements`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `ibocks`
--
ALTER TABLE `ibocks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `properties`
--
ALTER TABLE `properties`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `sections`
--
ALTER TABLE `sections`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `test`
--
ALTER TABLE `test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
