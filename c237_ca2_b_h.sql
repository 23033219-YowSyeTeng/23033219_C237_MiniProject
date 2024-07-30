-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2024 at 08:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237_ca2_b&h`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `productName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `brand` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int(100) NOT NULL,
  `image` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `description`, `category`, `brand`, `price`, `quantity`, `image`) VALUES
(4, 'Pantene Daily Moisture Renewal Shampoo and Conditioner for Strong, Nourished Hair', 'Pantene Daily Moisture Renewal Shampoo and Conditioner for Strong, Nourished Hair日日日', 'Shampoo', 'Pantene', 65, 99, 'pantene.jpg'),
(7, 'Sukin Botanical Body Wash, 1L', 'To gently cleanse and purify the body without drying.', 'Body Cair', 'Sukin', 20, 99, 'sukin.jpg'),
(12, 'Cetaphil Gentle Skin Cleanser 1L Hydrating Face & Body Wash for Sensitive, Dry Skin, Soap-Free', 'Ideal for dry to normal, sensitive skin: Hydrates and soothes as it cleanses, preserving skin\'s moisture barrier, even after repeat washes', 'Body Cair', 'Cetaphil', 31, 88, 'cetaphil.jpg'),
(13, 'Aveeno Skin Relief Fragrance-Free Body Wash with Triple Oat Formula Soothes Itchy, Dry Skin, Formulated for Sensitive Skin, Fragrance-, Paraben-, Dye- & Soap-Free, 975ml', 'The unique formula of this daily body wash is enriched with soothing Triple Oat blend made with oat flour, oat extract and oat oil to gently and effectively cleanse while leaving itchy, dry skin soothed and feeling moisturized.', 'Body Care', 'Aveeno', 30, 74, 'aveeno.jpg'),
(19, '& Honey Deep Moist Treatment, 445 grams', 'Providing an ultimate moisture\r\nCreating a whole new level of hydration\r\n100% Organic certified Moroccan oil\r\nFragrance of french lavender honey\r\nHoney coating technology to seal in nutrients and hydration', 'Moist Treatment', '&Honey', 25, 50, 'honey_deep.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profileId` int(200) NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `profileImage` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profileId`, `firstName`, `lastName`, `gender`, `birthday`, `address`, `profileImage`) VALUES
(1, 'Yow', 'Sye Teng', 'Female', '2004-07-14', '#11-64 Woodlands Avenue 6, Singapore 730763', 'girl2.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profileId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profileId` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
