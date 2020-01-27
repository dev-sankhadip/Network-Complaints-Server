-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 27, 2020 at 06:13 PM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `userid` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `number` varchar(13) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`userid`, `name`, `email`, `number`, `password`) VALUES
('OYjSvJJC', 'Arnab', 'a@mail.com', '7548046552', 'aB@12345'),
('z2RPyRAg', 'Arnab', 'arnab@mail.com', '7548046552', 'aB@12345');

-- --------------------------------------------------------

--
-- Table structure for table `netinfo`
--

CREATE TABLE `netinfo` (
  `id` varchar(10) NOT NULL,
  `userid` varchar(10) NOT NULL,
  `latitude` varchar(20) NOT NULL,
  `longitude` varchar(20) NOT NULL,
  `asuLevel` varchar(10) NOT NULL,
  `strength` varchar(10) NOT NULL,
  `networkType` varchar(10) NOT NULL,
  `operatorName` varchar(20) NOT NULL,
  `submissionDate` varchar(20) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `netinfo`
--

INSERT INTO `netinfo` (`id`, `userid`, `latitude`, `longitude`, `asuLevel`, `strength`, `networkType`, `operatorName`, `submissionDate`, `status`) VALUES
('5TRvCP5y', 'OYjSvJJC', '30.8781746', '76.8729739', '30', '-53', 'GSM', 'IDEA', 'Mon Jan 27 2020', 0),
('CIF96pm4j', 'OYjSvJJC', '30.8781746', '76.8729739', '33', '-47', 'GSM', 'airtel', 'Mon Jan 27 2020', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `netinfo`
--
ALTER TABLE `netinfo`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
