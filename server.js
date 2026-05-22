const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'tour_secret_2024',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Flash
app.use(flash());

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// 404
app.use((req, res) => {
    res.status(404).render('404', { user: req.session.user });
});

app.listen(PORT, () => {
    console.log(`\n🌍 Tour Booking Server running at http://localhost:${PORT}\n`);
});
