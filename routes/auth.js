const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { name, email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
        return res.status(400).json({
            message: 'Os dados introduzidos não são válidos.',
            errors: {
                passwordConfirmation: 'As passwords não coincidem.',
            },
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Os dados introduzidos não são válidos.',
                errors: {
                    email: 'O endereço introduzido já está registado.',
                },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ 
            message: 'Utilizador Criado com Sucesso!', 
            _id: newUser._id 
        });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'A password introduzida é inválida!' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

module.exports = router;
