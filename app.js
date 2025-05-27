const express = require('express');
const app = express();
const PORT = 7287;
const db = require('./api-part/database/database.js');

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});