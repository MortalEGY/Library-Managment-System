-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 02:51 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Id`, `Name`, `Email`, `Password`, `Phone`, `Gender`, `created_at`, `updated_at`) VALUES
(1, 'omar', 'o@gmail.com', 'father10', '01018149731', 'M', '2023-11-07 15:36:09', '2023-11-07 15:36:09'),
(2, 'temu', 'tem', 'father10', NULL, NULL, '2023-11-07 23:19:35', '2023-11-07 23:19:35');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `bookid` int(11) NOT NULL,
  `bookname` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `isbn` varchar(13) NOT NULL,
  `edition` varchar(50) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `available` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`bookid`, `bookname`, `publisher`, `author`, `isbn`, `edition`, `pages`, `available`, `created_at`, `updated_at`) VALUES
(4, '4', '4', '4', '4', '4', 4, 4, '2023-11-07 21:35:08', '2023-11-07 21:35:08'),
(5, '4', '4', '4', '4', '4', 4, 4, '2023-11-07 21:37:47', '2023-11-07 21:37:47'),
(46, 'Book2', '222', '222', '222', '222', 222, 222, '2023-11-08 10:32:25', '2023-11-08 10:32:25'),
(52, 'Book', 'Me', 'Me', '3131344828', '2', 222, 5, '2023-11-07 21:24:23', '2023-11-07 21:24:23');

-- --------------------------------------------------------

--
-- Table structure for table `bookreport`
--

CREATE TABLE `bookreport` (
  `id` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `bid` int(11) NOT NULL,
  `bname` varchar(255) NOT NULL,
  `issuedate` date DEFAULT NULL,
  `duedate` date DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookreport`
--

INSERT INTO `bookreport` (`id`, `sid`, `sname`, `bid`, `bname`, `issuedate`, `duedate`, `returnDate`, `created_at`, `updated_at`) VALUES
(2, 1, 'Omar', 52, 'Omar', '2023-11-08', '2023-11-12', NULL, '2023-11-08 00:01:37', '2023-11-08 00:01:37');

-- --------------------------------------------------------

--
-- Table structure for table `borrower`
--

CREATE TABLE `borrower` (
  `borrowerid` int(11) NOT NULL,
  `borrowername` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `borrower`
--

INSERT INTO `borrower` (`borrowerid`, `borrowername`, `email`, `phone`, `gender`) VALUES
(2, 'Ahmed', 'Null', '1018149721', 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`bookid`);

--
-- Indexes for table `bookreport`
--
ALTER TABLE `bookreport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrower`
--
ALTER TABLE `borrower`
  ADD PRIMARY KEY (`borrowerid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `bookid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `bookreport`
--
ALTER TABLE `bookreport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `borrower`
--
ALTER TABLE `borrower`
  MODIFY `borrowerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
