const db = require('../services/database').config;

const createBuild = (req, res) => {
    const { name } = req.body;
    const userId = req.user?.id; // assuming user info is attached via middleware

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const sql = `INSERT INTO builds (user_id, name) VALUES (?, ?)`;

    db.query(sql, [userId, name || 'Unnamed Build'], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        res.status(201).json({ buildId: result.insertId });
    });
};

module.exports = { createBuild };
