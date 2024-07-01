const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getAnswer } = require('../nlp/processQuery');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/getAnswer', async (req, res) => {
    const userQuery = req.body.query;
    const answer = await getAnswer(userQuery);
    res.json({ answer });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
