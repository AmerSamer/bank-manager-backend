const bankModel = require('../models/bank.model');
let count = 0

const getAllAccounts = async (req, res) => {
    const data = await bankModel.Bank.find({});
    return res.status(200).send(data)
}
const getAccountById = async (req, res) => {
    const { passportId } = req.body;
    bankModel.Bank.find( { passportId: { $eq: passportId } } , (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const addNewAccount = async (req, res) => {
    const { passportId } = req.body;

    const idExists = await bankModel.Bank.findOne({ passportId: passportId });
    if (idExists) {
        return res.status(400).json({ error: 'passportId already exist' });
    }

    const account = new bankModel.Bank({
        passportId: passportId,
        cash: 0,
        credit: 0
    })

    account.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}

const depositCash = async (req, res) => {
    const { passportId, cash } = req.body;
    const idExists = await bankModel.Bank.findOne({ passportId: passportId });
    if (idExists) {
        if (cash > 0) {
            count = idExists.cash + cash
            bankModel.Bank.findOneAndUpdate({ passportId: { $eq: idExists.passportId } }, { cash: count }, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).send(err);
                return res.status(200).send(data);
            });
        }
        else {
            return res.status(400).json({ error: 'Cash Should be posstive' });
        }
    } else {
        return res.status(400).json({ error: 'passportId not exist' });
    }
}
const updateCredit = async (req, res) => {
    const { passportId, credit } = req.body;
    const idExists = await bankModel.Bank.findOne({ passportId: passportId });
    if (idExists) {
        if (credit > 0) {
            bankModel.Bank.findOneAndUpdate({ passportId: { $eq: idExists.passportId } }, { credit: credit }, { new: true, runValidators: true }, (err, data) => {
                if (err) return res.status(404).send(err);
                return res.status(200).send(data);
            });
        }
        else {
            return res.status(400).json({ error: 'credit Should be posstive' });
        }
    } else {
        return res.status(400).json({ error: 'passportId not exist' });
    }
}
const withdrawCash = async (req, res) => {
    const { passportId, cash } = req.body;
    const idExists = await bankModel.Bank.findOne({ passportId: passportId });
    if (idExists) {
        if (cash > 0) {
            count = idExists.cash + idExists.credit - cash
            if (count >= 0) {
                temp = idExists.cash - cash
                bankModel.Bank.findOneAndUpdate({ passportId: { $eq: idExists.passportId } }, { cash: temp }, { new: true, runValidators: true }, (err, data) => {
                    if (err) return res.status(404).send(err);
                    return res.status(200).send(data);
                });
            } else {
                return res.status(400).json({ error: 'there is no enught money in this account' });
            }
        } else {
            return res.status(400).json({ error: 'cash Should be posstive' });
        }
    } else {
        return res.status(400).json({ error: 'passportId not exist' });
    }
}
const transferringCash = async (req, res) => {
    const { passportId, passportIdReciever, cash } = req.body;
    const idExists = await bankModel.Bank.findOne({ passportId: passportId });
    const idExists2 = await bankModel.Bank.findOne({ passportId: passportIdReciever });
    if (idExists) {
        if (idExists2) {
            if (cash > 0) {
                count = idExists.cash + idExists.credit - cash
                if (count >= 0) {
                    temp = idExists.cash - cash
                    temp2 = idExists2.cash + cash
                    bankModel.Bank.findOneAndUpdate({ passportId: { $eq: idExists.passportId } }, { cash: temp }, { new: true, runValidators: true }, (err, data) => {
                        if (err) return res.status(404).send(err);
                        // return res.status(200).send(data);
                        return bankModel.Bank.findOneAndUpdate({ passportId: { $eq: idExists2.passportId } }, { cash: temp2 }, { new: true, runValidators: true }, (err, data) => {
                            if (err) return res.status(404).send(err);
                            return res.status(200).send('ok');
                        });
                    });
                } else {
                    return res.status(400).json({ error: 'there is no enught money in this account' });
                }
            } else {
                return res.status(400).json({ error: 'cash Should be posstive' });
            }
        }else{
            return res.status(400).json({ error: 'passportId2 not exist' });
        }
    } else {
        return res.status(400).json({ error: 'passportId not exist' });
    }
}

module.exports = {
    getAllAccounts,
    addNewAccount,
    depositCash,
    updateCredit,
    withdrawCash,
    transferringCash,
    getAccountById
}