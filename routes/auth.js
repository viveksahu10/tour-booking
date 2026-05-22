const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// GET Login page
router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login', { error: req.flash('error'), success: req.flash('success') });
});

// POST Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/auth/login');
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/auth/login');
        }
        req.session.user = { id: user.id, name: user.name, email: user.email };
        req.flash('success', `Welcome back, ${user.name}!`);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server error. Please try again.');
        res.redirect('/auth/login');
    }
});

// GET Signup page
router.get('/signup', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('signup', { error: req.flash('error'), success: req.flash('success') });
});

// POST Signup
router.post('/signup', async (req, res) => {
    const { name, email, password, confirm_password, phone } = req.body;
    if (password !== confirm_password) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/auth/signup');
    }
    try {
        const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            req.flash('error', 'Email already registered.');
            return res.redirect('/auth/signup');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, phone]);
        req.flash('success', 'Account created! Please log in.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server error. Please try again.');
        res.redirect('/auth/signup');
    }
});

// GET Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
