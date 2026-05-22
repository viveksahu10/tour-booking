-- Tour Booking Database Setup
-- Run this file in MySQL: mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS tour_booking;
USE tour_booking;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tours table
CREATE TABLE IF NOT EXISTS tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    duration VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    max_capacity INT DEFAULT 20,
    image_url VARCHAR(300),
    category VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 4.5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tour_id INT NOT NULL,
    travel_date DATE NOT NULL,
    num_people INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample tours data
INSERT INTO tours (title, description, location, duration, price, max_capacity, image_url, category, rating) VALUES
('Golden Triangle Tour', 'Explore the iconic cities of Delhi, Agra and Jaipur with their rich Mughal heritage, majestic forts and colorful bazaars.', 'Delhi - Agra - Jaipur', '7 Days / 6 Nights', 25000.00, 20, 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800', 'Cultural', 4.8),
('Kerala Backwaters', 'Cruise through the serene backwaters of Kerala on a traditional houseboat, surrounded by lush greenery and tranquility.', 'Kochi - Alleppey - Munnar', '5 Days / 4 Nights', 18000.00, 15, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', 'Nature', 4.9),
('Himalayan Adventure', 'Trek through the breathtaking Himalayan landscapes, visit ancient monasteries and experience the thrill of high-altitude living.', 'Manali - Leh - Ladakh', '10 Days / 9 Nights', 45000.00, 12, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Adventure', 4.7),
('Goa Beach Getaway', 'Relax on Goa''s pristine beaches, enjoy water sports, explore Portuguese architecture and savor the vibrant nightlife.', 'North & South Goa', '4 Days / 3 Nights', 12000.00, 25, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 'Beach', 4.6),
('Rajasthan Royal Tour', 'Live like royalty in the land of kings. Explore magnificent palaces, golden deserts, and ancient fortresses.', 'Jodhpur - Udaipur - Jaisalmer', '8 Days / 7 Nights', 32000.00, 18, 'https://images.unsplash.com/photo-1477587458883-47145ed68245?w=800', 'Cultural', 4.8),
('Andaman Island Escape', 'Discover pristine beaches, crystal clear waters, and vibrant coral reefs in the untouched paradise of Andaman Islands.', 'Port Blair - Havelock - Neil Island', '6 Days / 5 Nights', 28000.00, 20, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'Beach', 4.9);
