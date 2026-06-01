const express = require('express');
const app = express();
const apiRoutes = require('./routes/Routes');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());
app.use(apiRoutes);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ erro: err.message });
});

module.exports = app;
