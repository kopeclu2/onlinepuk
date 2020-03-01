-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 01. bře 2020, 20:08
-- Verze serveru: 10.4.11-MariaDB
-- Verze PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `onlinepuk`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `matchactions`
--

CREATE TABLE `matchactions` (
  `matchactions_id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `type` int(11) NOT NULL,
  `teamHomeOrHost` int(11) NOT NULL,
  `match_id` int(255) NOT NULL,
  `time` varchar(20) COLLATE utf8_czech_ci NOT NULL,
  `seconds` varchar(11) COLLATE utf8_czech_ci NOT NULL,
  `faulType` int(5) DEFAULT NULL,
  `generalType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `matchactions`
--

INSERT INTO `matchactions` (`matchactions_id`, `content`, `type`, `teamHomeOrHost`, `match_id`, `time`, `seconds`, `faulType`, `generalType`) VALUES
(64, '', 0, 3, 106, '', '', 0, 2),
(65, 'Lukas Kopecky', 0, 1, 106, '20', '20', 3, 0),
(66, 'Zraneni brankar', 2, 1, 106, '21', '20', 0, 3),
(67, '', 1, 3, 106, '', '', 0, 2),
(68, '', 2, 3, 106, '', '', 0, 2),
(69, '', 3, 3, 106, '', '', 0, 2),
(70, 'Lukas Koepckz', 0, 1, 106, '62', '20', 2, 0),
(71, '', 5, 3, 106, '', '', 0, 2),
(72, 'asd', 0, 2, 106, '20', '20', 2, 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `matches`
--

CREATE TABLE `matches` (
  `id` int(255) NOT NULL,
  `name` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `teamHome` int(255) NOT NULL,
  `teamHost` int(255) NOT NULL,
  `scoreHome` int(20) NOT NULL,
  `scoreHost` int(20) NOT NULL,
  `date` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `matchState` int(50) NOT NULL,
  `stadion` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT 0,
  `live` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `matches`
--

INSERT INTO `matches` (`id`, `name`, `teamHome`, `teamHost`, `scoreHome`, `scoreHost`, `date`, `matchState`, `stadion`, `finished`, `live`) VALUES
(106, NULL, 1, 7, 1, 17, '2020-02-28T21:05:48.766Z', 0, 'DEFAULT VALUE', 0, 1),
(107, NULL, 4, 1, 0, 0, '2020-02-29T17:00:00.614Z', 0, 'DEFAULT VALUE', 0, 0),
(108, NULL, 1, 4, 0, 0, '2020-03-01T19:01:06.687Z', 0, 'DEFAULT VALUE', 0, 0),
(109, NULL, 1, 4, 0, 0, '2020-03-01T19:06:01.826Z', 0, 'DEFAULT VALUE', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `matchuserscomments`
--

CREATE TABLE `matchuserscomments` (
  `comment_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `content` varchar(1024) COLLATE utf8_czech_ci NOT NULL,
  `date` datetime NOT NULL,
  `matchId` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `matchuserscomments`
--

INSERT INTO `matchuserscomments` (`comment_id`, `user`, `content`, `date`, `matchId`) VALUES
(25, 17, 'ahpoj 1717 asdasdasdad 1 8', '2020-01-17 04:00:00', 8),
(26, 17, 'ahpoj koknetar', '2020-01-17 04:00:00', 8),
(27, 17, 'Eliska nejki', '2020-01-17 04:00:00', 8),
(28, 16, 'ahpoj koknetar', '2020-01-17 04:00:00', 8),
(29, 17, 'Eliska nejki', '2020-01-17 04:00:00', 0),
(30, 17, 'Eliska nejki', '2020-01-17 04:00:00', 0),
(31, 17, 'Server listening on port 4000', '2020-01-17 04:00:00', 8),
(32, 8, 'Eliska nejki', '2020-01-17 04:00:00', 8);

-- --------------------------------------------------------

--
-- Struktura tabulky `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `nazev` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `img` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `teams`
--

INSERT INTO `teams` (`id`, `nazev`, `img`) VALUES
(1, 'HC Čestice', 'http://www.hccestice.cz/img/picture/1032/znak_hc_cestice_250px.png'),
(2, 'SK Žamberk', 'http://www.hccestice.cz/img/picture/1026/sk_zamberk.png'),
(3, 'IHC Polička', 'https://www.hccestice.cz/file/106/znak_ihc_policka.png'),
(4, 'TJ Voděrady', 'http://www.hccestice.cz/img/picture/1027/tj_voderady.png'),
(5, 'HC Choceň', 'http://www.hccestice.cz/img/picture/1022/hc_chocen.png'),
(6, 'HC Moravská Třebová', 'http://www.hccestice.cz/img/picture/1024/hc_moravska_trebova.png'),
(7, 'HC Litomyšl B', 'http://www.hccestice.cz/img/picture/1023/hc_litomysl_b.png'),
(8, 'TJ Tatran Hrušky', 'https://www.hccestice.cz/img/picture/1081/tatran_hrusky.png');

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `role` varchar(5) COLLATE utf8_czech_ci NOT NULL DEFAULT 'User',
  `password` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `user_img` varchar(255) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `role`, `password`, `user_img`) VALUES
(8, 'lukas', 'lukas@cy.za', 'User', 'heslo', ''),
(9, 'lukaaas', 'lukas@cy.aa', 'User', 'heslo', ''),
(10, 'lukaaass', 'lukas@cy.aa', 'User', 'heslo', ''),
(11, 'lukaaa', 'lukas@cy.aa', 'User', 'heslo', ''),
(12, 'lukss', 'lukas@cy.aa', 'User', 'heslo', ''),
(13, 'luksas', 'lukas@cy.aa', 'User', 'heslo', ''),
(14, 'luksassss', 'lukas@cy.aa', 'User', 'heslo', ''),
(15, 'admin', 'lukas@cy.aa', 'Admin', 'admin', ''),
(16, 'admina', 'lukas@cy.aa', 'User', 'admin', ''),
(17, 'Lukasek', 'lukas@cy.aa', 'Admin', 'admin', 'http://www.hccestice.cz/img/picture/1026/sk_zamberk.png');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `matchactions`
--
ALTER TABLE `matchactions`
  ADD PRIMARY KEY (`matchactions_id`),
  ADD KEY `matchactions_ibfk_1` (`match_id`);

--
-- Klíče pro tabulku `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `matchuserscomments`
--
ALTER TABLE `matchuserscomments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Klíče pro tabulku `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `matchactions`
--
ALTER TABLE `matchactions`
  MODIFY `matchactions_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT pro tabulku `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT pro tabulku `matchuserscomments`
--
ALTER TABLE `matchuserscomments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pro tabulku `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `matchactions`
--
ALTER TABLE `matchactions`
  ADD CONSTRAINT `matchactions_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
