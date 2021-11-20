const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    passportId: {
        type: Number,
        required: true,
    },
    cash: {
        type: Number,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    }
});

const Bank = mongoose.model('bank', bankSchema);

module.exports = {
    Bank
}