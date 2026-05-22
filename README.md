# WanderLux Tour Booking Website

A full-stack tour booking website built with Node.js, Express, EJS, MySQL.

## Pages
- **Home** — Hero, featured tours, testimonials
- **About** — Story, team, values
- **Booking** — Browse & book tours (requires login)
- **Contact** — Contact form with database storage
- **Login / Sign Up** — Authentication with hashed passwords

## Tech Stack
- **Frontend**: HTML, CSS (custom), EJS templating
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Auth**: bcryptjs, express-session
- **Other**: connect-flash, dotenv

---

## Setup Instructions

### 1. Install Node.js
Download from https://nodejs.org (v18+ recommended)

### 2. Install MySQL
Download MySQL Community Server and start the service.

### 3. Create the Database
```bash
mysql -u root -p < database.sql
```
This creates the `tour_booking` database and inserts sample tours.

### 4. Configure Environment
Edit `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tour_booking
SESSION_SECRET=any_random_secret_string
PORT=3000
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Start the Server
```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

### 7. Open in Browser
Visit: http://localhost:3000

---

## Project Structure
```
tour-booking/
├── server.js           # Main entry point
├── .env                # Environment variables
├── database.sql        # MySQL schema + sample data
├── package.json
├── config/
│   └── db.js           # Database connection pool
├── routes/
│   ├── index.js        # Main routes (home, about, booking, contact)
│   └── auth.js         # Login, signup, logout
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── about.ejs
│   ├── booking.ejs
│   ├── contact.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   └── 404.ejs
└── public/
    ├── css/style.css
    └── js/main.js
```

## Features
- User registration & login with password hashing
- Session-based authentication
- Tour browsing with category filters
- Booking form with live price calculator
- Contact form with database storage
- Flash messages for user feedback
- Responsive design (mobile-friendly)
- Navbar scroll effect + hamburger menu
