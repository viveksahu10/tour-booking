const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Home page
router.get('/', async (req, res) => {
    try {
        const [tours] = await db.execute('SELECT * FROM tours LIMIT 6');
        res.render('home', { user: req.session.user, tours, messages: { success: req.flash('success'), error: req.flash('error') } });
    } catch (err) {
        console.error(err);
        res.render('home', { user: req.session.user, tours: [], messages: {} });
    }
});

// About page
router.get('/about', (req, res) => {
    res.render('about', { user: req.session.user });
});

// Booking page
router.get('/booking', async (req, res) => {
    try {
        const [tours] = await db.execute('SELECT * FROM tours ORDER BY title');
        res.render('booking', { user: req.session.user, tours, messages: { success: req.flash('success'), error: req.flash('error') } });
    } catch (err) {
        console.error(err);
        res.render('booking', { user: req.session.user, tours: [], messages: {} });
    }
});

// POST Booking
router.post('/booking', async (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Please login to book a tour.');
        return res.redirect('/auth/login');
    }
    const { tour_id, travel_date, num_people, special_requests } = req.body;
    try {
        const [tourRows] = await db.execute('SELECT * FROM tours WHERE id = ?', [tour_id]);
        if (tourRows.length === 0) {
            req.flash('error', 'Tour not found.');
            return res.redirect('/booking');
        }
        const tour = tourRows[0];
        const total_price = tour.price * parseInt(num_people);
        await db.execute(
            'INSERT INTO bookings (user_id, tour_id, travel_date, num_people, total_price, special_requests) VALUES (?, ?, ?, ?, ?, ?)',
            [req.session.user.id, tour_id, travel_date, num_people, total_price, special_requests]
        );
        req.flash('success', `Booking confirmed! Total: ₹${total_price.toLocaleString()}`);
        res.redirect('/booking');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Booking failed. Please try again.');
        res.redirect('/booking');
    }
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact', { user: req.session.user, messages: { success: req.flash('success'), error: req.flash('error') } });
});

// POST Contact
router.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await db.execute('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]);
        req.flash('success', 'Message sent! We will get back to you soon.');
        res.redirect('/contact');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to send message. Please try again.');
        res.redirect('/contact');
    }
});

module.exports = router;
