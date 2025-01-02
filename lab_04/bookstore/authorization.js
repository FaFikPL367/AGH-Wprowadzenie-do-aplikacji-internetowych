const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Pobranie nagłówka Authorization
    const token = authHeader && authHeader.split(' ')[1]; // Nagłówek ma format "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, "9639526b02ff275b6dc689c328dba3ed18732198914420ac02135efa536365d7723eacdd31e8f5faf576740fc91c9f85b6a206bd151057c0e39078ee23f19a75", (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
