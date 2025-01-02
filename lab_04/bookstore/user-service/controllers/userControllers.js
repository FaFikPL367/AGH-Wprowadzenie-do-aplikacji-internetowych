const UserSchema = require('../db');
const validator = require('email-validator');
const jwt = require('jsonwebtoken');


// 1. Założenie konta w księgarni
const userRegister = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Sprawdzanie poprawności maila
        if (!validator.validate(email)) { return res.status(400).json({ message: 'Wrong email !!' }) };
        if (await UserSchema.findOne({where: {email}})) { return res.status(400).json({ message: 'Account on this email exist !!'})}

        const newUser = await UserSchema.create({email, password});
        return res.status(200).json({ userID: newUser.id });
    } catch(error) {
        return res.status(500).json({message: 'Error fetching users', error: error.toString()});
    }
};

// 2. Logowanie się użytkownika
const userLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserSchema.findOne({where: {email}});
        if (!user) { return res.status(404).json({ message: 'User not found !!' }) };

        if (user.password !== password) { return res.status(404).json({ message: 'Invalid password' })};

        const token = jwt.sign(
            { id: user.id, email: user.email }, // payload
            "9639526b02ff275b6dc689c328dba3ed18732198914420ac02135efa536365d7723eacdd31e8f5faf576740fc91c9f85b6a206bd151057c0e39078ee23f19a75",                 
            { expiresIn: '1h' }                // czas ważności tokenu
        );
        return res.status(200).json({token: token});
    } catch(error) {
        return res.status(500).json({ message: 'Error fetching users', error: error.toString() });
    }
};


module.exports = {userRegister, userLogin};