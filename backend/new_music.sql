-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2020 at 07:55 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_music`
--

-- --------------------------------------------------------

--
-- Table structure for table `albumcastdetails`
--

CREATE TABLE `albumcastdetails` (
  `albumId` int(11) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `albumcastdetails`
--

INSERT INTO `albumcastdetails` (`albumId`, `artistId`) VALUES
(1, 2),
(1, 4),
(1, 5),
(2, 13),
(2, 14),
(2, 15),
(3, 24),
(3, 25),
(4, 32),
(4, 33),
(5, 37),
(5, 38),
(5, 39),
(5, 40),
(6, 39),
(6, 47),
(6, 48),
(7, 5),
(7, 49);

-- --------------------------------------------------------

--
-- Table structure for table `albumcomposerdata`
--

CREATE TABLE `albumcomposerdata` (
  `albumId` int(11) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `albumcomposerdata`
--

INSERT INTO `albumcomposerdata` (`albumId`, `artistId`) VALUES
(1, 1),
(2, 1),
(3, 23),
(4, 31),
(5, 36),
(6, 46),
(7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `albumlikes`
--

CREATE TABLE `albumlikes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` varchar(255) NOT NULL,
  `albumId` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `albumlikes`
--

INSERT INTO `albumlikes` (`id`, `userId`, `albumId`, `time`) VALUES
('26f6db18-ac29-4d1a-a08a-0ff0edcae6eb', 'TUQG69ISPSLJI2LZF7D', 2, '2020-06-25 14:47:47');

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL,
  `releaseDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `rating`, `imageUrl`, `likes`, `releaseDate`) VALUES
(1, 'Red', 3.5, '47k1P0NFmFBh2mW98kjdF1r4AatJv2HQ8ReiaxwrYo0oaIEnV5.jpeg', 0, '2020-07-23 00:00:00'),
(2, 'Orey Bujjiga', 3.5, '3evkxnQdnPjPVIqAy2QIeh0f1uDp51VkqAAKo8KgBQRQ96KPPP.jpeg', 3, '2020-06-18 00:00:00'),
(3, 'Aakaasam Nee Haddhu Ra', 3.5, '6asBFbt8WbNO0ZObutmAV4smC7oZ0EjMkITwcsGUDNPGnSeP4M.jpeg', 0, '2020-06-08 00:00:00'),
(4, 'Love Story', 3.5, 'DD44bmfWJ63Z9kaY9gJalRjnj5h5Xvzy3tymULL90WPac3EWlp.jpeg', 0, '2020-06-15 00:00:00'),
(5, 'V', 3.5, '9tR4wWu4hOzuzHmfrHNjlgG2FyPRyKwQw6YHuglw6nEkpm9xbB.jpeg', 0, '2020-06-19 00:00:00'),
(6, 'Vakeel Saab', 3.5, 'SChFSGopyO5rftyrQCPemlH4RpBa7yvTpRLldNjEleCHgmQ6WF.jpeg', 0, '2020-06-18 00:00:00'),
(7, '30 Rojullo Preminchadam Ela', 3.5, 'WVRGT5cRZFXcOOppWcSm7ickeniEYD95zl1hKNIqDRK3R7L0r8.jpeg', 0, '2020-06-23 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `artistlikes`
--

CREATE TABLE `artistlikes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time` time NOT NULL,
  `artistId` int(11) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imageURL` text DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`, `imageURL`, `likes`) VALUES
(1, 'Anup Rubens', 'r3C1XoFVbT1EGARXf7uvtZzzEmi0wbCVDumlstXQVxFGxVLEOd.jpeg', 0),
(2, 'Ram', 'rH8TTFNZSMiKQ6qkQsoSsIhQ2gTyapa02UejG5Q4AkN3Nco0JN.png', 0),
(4, 'Malvika Sharma', 'Psm7poDm5HfebFFPSRZyvYAhNFOzZES4LOkfZeIreIcEY6ZpQN.jpeg', 0),
(5, 'Amritha Aiyer', 'kExHya6eiQ1WTKpuCKdd4xQEhIAJwQtjTIniWWQ7UwKGwtkkvB.jpeg', 0),
(9, 'Ramya Behara', 'FcpvmdRNFDbjk9szFggGB3YN8GA4UHodcj3oXjtt8M3wtgxsCz.jpeg', 0),
(10, 'Anurag Kulkarni', 'dcqV0BGggBNVoN76E55UJse0yq8xJ2X84KHKEdXTJTiITxxVTe.jpeg', 0),
(11, 'Mani Sharma', '7wRa8DJeznqtWSeQiEQyWQ6Gyem51fBzicqeOwsl4fvV6qdkV1.jpeg', 0),
(12, 'Sirivennela Sitaramasastri', 'default', 0),
(13, 'Hebah Patel', 'i0MFBmjIc3NR1Tm0c2FPvX3yGxD5EbyrMmPzbOPNS2wvOvmNnX.jpeg', 0),
(14, 'Malvika Nair', 'y9SzFL9Amy9MEhXLvpYBZfTV2x0OHpxYMvb8ZdlXYfZMRwvIv2.jpeg', 0),
(15, 'Raj Tarun', 'lDUI8NEVNto8YDkNkrZsgBmqDo0nD4D9fva5SF4w7KHTYD3uhE.jpeg', 0),
(16, 'Armaan Malik', '1q6OyWo0CCidDcCFRAd5t7HjozNrrTnCIzNsaLo2ERKOlFOYFz.jpeg', 0),
(17, 'P Meghana', 'default', 0),
(18, 'Krishna Kanth', 'default', 0),
(19, 'Sid Sriram', 'JwbsTxSm86AMoOGXuG5QIUjSZGjbzqMZGUgTHBfU50bpPLTuqi.jpeg', 0),
(20, 'Kittu Vissapragada', 'default', 0),
(21, 'Rahul Sipligunj', 'JmQH7XBjPjxkB81gL5gjexQBLglhVlZVz6hkj2X0vE6wVOR7dh.jpeg', 0),
(22, 'Kasarla Shyam Kumar', 'default', 0),
(23, 'G.V. Prakash Kumar', 'il8eVeEVjwT76hQfYrsY2BDkD6kpkJSkfaXsNoCLKHYUhYncRd.jpeg', 0),
(24, 'Aparna Balamurali', 'db1c1NaCzMuKaKcrJs8HyE75T2O2D2KvhISwdrjqkqP4jlMNZh.jpeg', 0),
(25, 'Surya', 'AC8M8NCZNJgn8D0mDOjGpTzlXnkAhMcJfFlW7TDddyPcd2oJT9.jpeg', 0),
(26, 'Pranav Chaganty', 'default', 0),
(27, 'Harish Sivaramakrishnan', 'MIuxZuOHrMf55g9WnT8KNyAWk0NHTqyb5gcb5gC4vi52ZMg0KD.jpeg', 0),
(28, 'Revanth', 'pkIpBtjvbvpOWOcsAXy2pttxMfATa7DyIFcwWMoGw8Io0Ip4o9.jpeg', 0),
(29, 'Rakendu Mouli', 'default', 0),
(30, 'Ramajogayya Sastry', 'default', 0),
(31, 'Pawan Ch', 'default', 0),
(32, 'Naga Chaitanya', 'ljtnheKr7h7EXTqDYt6a79CtPoNKko8e4TDGpekEIJ4DNskTeY.jpeg', 0),
(33, 'sai pallavi', 'NVFc1zOCxF560TlAEhCHYSAhl6uxe49EMGoHF3GHGe7KoQSCqW.jpeg', 0),
(34, 'Haricharan', 'GEurwsrAVsAoGkL4LUtyGn8PQ88joJtDpoXlFIR3XCNop20KW6.jpeg', 0),
(35, 'Chaithanya Pingali', 'default', 0),
(36, 'Amit Trivedi', 'zOyQUQjWHRlgmg41wp74ouMAhW447Tv9c5LRU3UZ20i7LIHeRF.jpeg', 0),
(37, 'Nani', 'KLdAFg0zIwTzsUoPoH8urN5AGwttkbMCPHwHEN3bN3k67yPFVy.jpeg', 0),
(38, 'Sudheer Babu', 'xEKlW4Sfh1rJMg4UonyK4NYMncCCB6NwQpD0wez5ejPCbM306p.jpeg', 0),
(39, 'Nivetha Thomas', 'SZmkdJCNcMLVXoYNRFDxARDxitnuKSlYdZm05w52UlZlq4tXxg.jpeg', 0),
(40, 'Aditi Rao Hydari', 'RnhtMJ9C102UuhjiVW50jRFvFDMm2AzGeVAaWHqeeAkomvXzrO.jpeg', 0),
(41, 'Shashaa Tirupati', 'Z1Beptha3AiHox1ljoniVevJop2eonas8XB7r8X5UI19km5O2a.jpeg', 0),
(42, 'Yazin Nizar', 'SupfMUzeg6ExP8SYynxnbipC6Pb2xtm2zHTTs1fxlxgMVUhLTa.jpeg', 0),
(43, 'Seetharama Sastry', 'default', 0),
(44, 'Shreya Ghoshal', 'POJCT4aMe2zogFysxpA8yuiFoeIaOKRpnIpCYjO1sJEvvV8uD6.jpeg', 0),
(45, 'Sirivennela Seetharamasastri', 'default', 0),
(46, 'SS Thaman', 'BbM02ZIXTnZBypq6BMlyYZPewnbhtRukCczfbEVtYFsx36uMFH.jpeg', 0),
(47, 'Pawan Kalyan', 'i0IJL0Xgh9reMWx4DlVdPXJeKT0H2bJJNaN0VMlq9nKPhar8em.png', 0),
(48, 'Anjali', '26rteX4EnJipH66zMahpYDp4VTprx22e7zyxIbci4gSSQ3aexo.jpeg', 0),
(49, 'Pradeep Machiraju', 'W2O4SBx097RdHoTYeR4RAiy2sZPPQELMQrCWkfdIUhjXQeOp3h.jpeg', 0),
(50, 'Suneetha', 'yYERunXpJfWJZmn3aA12IF4z3CZeQO47fyXDTXfrSXtQigc4b3.jpeg', 0),
(51, 'Chandrabose', 'IjkGyByySY8Sd5DZkZ5UHw5ORik5hkc3fmEDBpgp4VnjSWntou.jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `albumId` int(11) DEFAULT NULL,
  `text` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `albumId`, `text`, `time`) VALUES
('ea9f1319-bb73-43a0-ad6b-099265926be7', 'TUQG69ISPSLJI2LZF7D', 5, 'this is crazy', '2020-06-25 14:49:11');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time` time NOT NULL,
  `songId` int(11) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lyricists`
--

CREATE TABLE `lyricists` (
  `songId` int(11) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mooddata`
--

CREATE TABLE `mooddata` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mooddata`
--

INSERT INTO `mooddata` (`id`, `name`) VALUES
(1, 'Aggressive'),
(2, 'Bitter'),
(3, 'Bittersweet'),
(4, 'Dreamy'),
(5, 'Elegant'),
(6, 'Erotic'),
(7, 'Exotic'),
(8, 'Gentle'),
(9, 'Gloomy'),
(10, 'Graceful'),
(11, 'Grim'),
(12, 'Bleak'),
(13, 'Driving'),
(14, 'Epic'),
(15, 'Fun'),
(16, 'Sad'),
(17, 'Love'),
(18, 'Motivate'),
(19, 'Scary'),
(20, 'Spicy');

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `createdBy` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `playlist_type` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `playlist_data`
--

CREATE TABLE `playlist_data` (
  `playlistID` int(11) DEFAULT NULL,
  `songID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `songlikes`
--

CREATE TABLE `songlikes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time` time NOT NULL,
  `songId` int(11) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `songlikes`
--

INSERT INTO `songlikes` (`id`, `time`, `songId`, `userId`) VALUES
('91430d4b-84e2-4dc9-a7a6-7514370ca399', '00:00:00', 4, 'TUQG69ISPSLJI2LZF7D'),
('c54b879d-2df8-4f7e-a0a3-370306d29932', '00:00:00', 3, 'TUQG69ISPSLJI2LZF7D'),
('f0e27678-04de-4da9-9ab6-865c65acbde4', '00:00:00', 2, 'TUQG69ISPSLJI2LZF7D');

-- --------------------------------------------------------

--
-- Table structure for table `songmoodrelations`
--

CREATE TABLE `songmoodrelations` (
  `songID` int(11) DEFAULT NULL,
  `moodTypeID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `songmoodrelations`
--

INSERT INTO `songmoodrelations` (`songID`, `moodTypeID`) VALUES
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL),
(NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `songURL` text NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `playCount` int(11) NOT NULL DEFAULT 0,
  `albumId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `name`, `songURL`, `likes`, `playCount`, `albumId`) VALUES
(1, 'Kurisena Kurisena', 's5ioIGhFuaFDE0AjyTt8y5JyyF9V33YGbvpIxyF5Dbw4YoD9xq.mp3', 0, 0, 1),
(2, 'Kurisena Kurisena', 'sKCMseKjiIhEeHBsycJV9BwLBdGn20Wdf06KzmAM8emj7JbCl4.mp3', 1, 0, 2),
(3, 'Ee Maya Peremito', '2Uz78wr7R0ad2hTEORG4gPIetzyfF8VKNP9RA5HW4SVI5slWDj.mp3', 1, 0, 2),
(4, 'Krishnaveni', 'UK4LYeW3bC9j2uWookY981bHZPgFxZMQNt77ZXBwUSExlTh8WY.mp3', 1, 0, 2),
(5, 'Maha Theme', 'Q43PkWqy2yRpAqx1KRYBKZRfsgas2c3vypsa4MVsraedb2iKo7.mp3', 0, 0, 3),
(6, 'Pilla Puli', 'fJi8fFlZrywbUU2718Wph1eEdtOFBjIGtumV9NvNjXTUTilFMH.mp3', 0, 0, 3),
(7, 'Sithramaina Bhoomi', 'WjY48g0hcMau8Eagw7FzsYOzp2ldyXTs5AJzfiEfJDWvllUiQD.mp3', 0, 0, 3),
(8, 'Ay Pilla', 'phMqsOXlmeSmZ5lQRtwndkbKBn9Pp3fd67vrvNDx6RP2a5U54E.mp3', 0, 0, 4),
(9, 'Manasu Maree', 'VKzVx3Mall2Esu7CmpSe7fBHjqyDqRCGS9awpiYpUjd7cuhNpg.mp3', 0, 0, 5),
(10, 'Vastunna Vachestunna', 'W10H0IgFdwVpkRPF5xaY8ru30HZfvyE1pHq931VYbmLPcNmreR.mp3', 0, 0, 5),
(11, 'Maguva Maguva', 'ePXUOV1QZx6AlH7NGHdswOrqi4UnQdb4SGnKAGMWEzWLU4R63A.mp3', 0, 0, 6),
(12, 'Neeli Neeli Aakasam', 'raP61qO5xZOTU1vIupAgrbsaJ0OTP2aspC3R1nRk6BEigKGnNU.mp3', 0, 0, 7),
(13, 'Idera Sneham', 'hYDNtcU2tWaDvYY7PyUwcKKpA3DWo08hBZnmyfA4DrTiWjFrve.mp3', 0, 0, 7),
(14, 'Meeko Dhandam', 'AdtQGGR1xIq57avkIzZL3RrxBS3Fo9v9AwO72vR7zXkQDbcTCz.mp3', 0, 0, 7);

-- --------------------------------------------------------

--
-- Table structure for table `songssingersdata`
--

CREATE TABLE `songssingersdata` (
  `songId` int(11) DEFAULT NULL,
  `artistId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `songssingersdata`
--

INSERT INTO `songssingersdata` (`songId`, `artistId`) VALUES
(1, 9),
(1, 10),
(1, 11),
(2, 16),
(2, 17),
(3, 19),
(4, 21),
(5, 23),
(6, 10),
(6, 27),
(7, 21),
(7, 28),
(8, 34),
(9, 36),
(9, 41),
(9, 42),
(10, 36),
(10, 44),
(11, 19),
(12, 1),
(12, 19),
(12, 50),
(13, 19),
(14, 21);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `secondname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneno` varchar(255) DEFAULT NULL,
  `dob` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilepic` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `verficationcode` varchar(255) DEFAULT NULL,
  `verficationTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `secondname`, `email`, `phoneno`, `dob`, `gender`, `password`, `profilepic`, `status`, `verficationcode`, `verficationTime`) VALUES
('PDISU66NZ4X0ZOTI1K0', 'Venkatesh', 'Morla', 'morlavenkatesh19@gmail.com', '7799364114', '1998-12-09', 'Male', '$2a$12$PYVoy5ni0D5rQmnRrvTeGerNlHuYImNAdkstFb1qC37INo5JBHJ2m', 'default', 'verified', 'B0W48OSMKSC7PB55L9BEG3MZH2W2KTN5DZ1KLDW01GHJVYYEC7YXCFE9WVQTYYU6WAODVG9JEJ0152MFORRUBV0RQ24VJ2VLM863', NULL),
('TUQG69ISPSLJI2LZF7D', 'venkatesh', 'morla', 'morlavenkatesh39@gmail.com', '07799364114', '2020-06-18', 'Male', '$2a$12$hK/kE4mp5Pp1BLwybv1Ap.FAAZter6NX0P8ExIeAJYCdvRAuo.tLW', 'default', 'verified', 'ECS90555NHVL9CNX3RAOHVDFQ2O5563YWV4IFBBM4NQB8W9FUGC5EZZM1COVJBD5X37YWRL1C7OGHEFJVVI8ORLOJE4WI3YNH99K', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albumcastdetails`
--
ALTER TABLE `albumcastdetails`
  ADD UNIQUE KEY `albumCastDetails_artistId_albumId_unique` (`albumId`,`artistId`),
  ADD KEY `artistId` (`artistId`);

--
-- Indexes for table `albumcomposerdata`
--
ALTER TABLE `albumcomposerdata`
  ADD UNIQUE KEY `albumcomposerdata_artistId_albumId_unique` (`albumId`,`artistId`),
  ADD KEY `artistId` (`artistId`);

--
-- Indexes for table `albumlikes`
--
ALTER TABLE `albumlikes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `albumlikes_userId_albumId_unique` (`userId`,`albumId`),
  ADD KEY `albumId` (`albumId`);

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artistlikes`
--
ALTER TABLE `artistlikes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `artistlikes_userId_artistId_unique` (`artistId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `albumId` (`albumId`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `histories_userId_songId_unique` (`songId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `lyricists`
--
ALTER TABLE `lyricists`
  ADD UNIQUE KEY `Lyricists_artistId_songId_unique` (`songId`,`artistId`),
  ADD KEY `artistId` (`artistId`);

--
-- Indexes for table `mooddata`
--
ALTER TABLE `mooddata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `playlist_data`
--
ALTER TABLE `playlist_data`
  ADD KEY `playlistID` (`playlistID`),
  ADD KEY `songID` (`songID`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `songlikes`
--
ALTER TABLE `songlikes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `songlikes_userId_songId_unique` (`songId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `songmoodrelations`
--
ALTER TABLE `songmoodrelations`
  ADD KEY `songID` (`songID`),
  ADD KEY `moodTypeID` (`moodTypeID`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `albumId` (`albumId`);

--
-- Indexes for table `songssingersdata`
--
ALTER TABLE `songssingersdata`
  ADD UNIQUE KEY `songsSingersData_artistId_songId_unique` (`songId`,`artistId`),
  ADD KEY `artistId` (`artistId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `mooddata`
--
ALTER TABLE `mooddata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albumcastdetails`
--
ALTER TABLE `albumcastdetails`
  ADD CONSTRAINT `albumcastdetails_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `albumcastdetails_ibfk_2` FOREIGN KEY (`artistId`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `albumcomposerdata`
--
ALTER TABLE `albumcomposerdata`
  ADD CONSTRAINT `albumcomposerdata_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `albumcomposerdata_ibfk_2` FOREIGN KEY (`artistId`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `albumlikes`
--
ALTER TABLE `albumlikes`
  ADD CONSTRAINT `albumlikes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `albumlikes_ibfk_2` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `artistlikes`
--
ALTER TABLE `artistlikes`
  ADD CONSTRAINT `artistlikes_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `artistlikes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lyricists`
--
ALTER TABLE `lyricists`
  ADD CONSTRAINT `lyricists_ibfk_1` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lyricists_ibfk_2` FOREIGN KEY (`artistId`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`);

--
-- Constraints for table `playlist_data`
--
ALTER TABLE `playlist_data`
  ADD CONSTRAINT `playlist_data_ibfk_1` FOREIGN KEY (`playlistID`) REFERENCES `playlists` (`id`),
  ADD CONSTRAINT `playlist_data_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`id`);

--
-- Constraints for table `songlikes`
--
ALTER TABLE `songlikes`
  ADD CONSTRAINT `songlikes_ibfk_1` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `songlikes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `songmoodrelations`
--
ALTER TABLE `songmoodrelations`
  ADD CONSTRAINT `songmoodrelations_ibfk_1` FOREIGN KEY (`songID`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `songmoodrelations_ibfk_2` FOREIGN KEY (`moodTypeID`) REFERENCES `mooddata` (`id`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `songssingersdata`
--
ALTER TABLE `songssingersdata`
  ADD CONSTRAINT `songssingersdata_ibfk_1` FOREIGN KEY (`songId`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `songssingersdata_ibfk_2` FOREIGN KEY (`artistId`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
