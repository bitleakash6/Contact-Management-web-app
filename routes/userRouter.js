const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtAuthMiddleware } = require('../jwt');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            res.status(400).json({ message: 'All fields are mendatory' });
        }

        const userAvailable = await User.findOne({ email: email });
        if (userAvailable) {
            res.status(400).json({ message: 'Already user registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        });
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email });
        } else {
            res.status(400);
            throw new Error("user data is not valid");
        }
    } catch (err) {
        console.log("error are : ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({error : 'All fields are mandatory'});
    }
    const user = await User.findOne({ email });
    if (user && (bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id,
            },
        }, process.env.JWT_SECRET,
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401).json({error : 'email or password is not valid'});
    }
});

router.get('/current',jwtAuthMiddleware ,(req, res) => {
    res.json({ message: 'current user running' });
});

module.exports = router;