const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');

// app.use(bodyParser.json());;
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use('/api/bank', require('./routes/bank.route'));

// process.env.DB_URL/
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
app.listen(process.env.PORT || 4001, () => console.log(`Listening on port ${process.env.PORT || 4001}`));