const express = require('express');
const bankController = require('../controllers/bank.controller')
const router = express.Router();

router.get('/', (req, res) => {
    bankController.getAllAccounts(req, res);
}).post('/', (req, res) => {
    bankController.addNewAccount(req, res);
}).put('/deposit', (req, res) => {
        bankController.depositCash(req, res);
}).put('/credit', (req, res) => {
    bankController.updateCredit(req, res);
}).put('/withdraw', (req, res) => {
    bankController.withdrawCash(req, res);
}).put('/transferring', (req, res) => {
    bankController.transferringCash(req, res);
}).get('/id', (req, res) => {
    bankController.getAccountById(req, res);
})

module.exports = router;