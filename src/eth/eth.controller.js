'use strict'

const Web3 = require('web3');
const Constants = require('../constants');
const web3 = new Web3(Constants.WEB3);

// Create Wallet and Return Private Key to Save to Client Side
const create = (req, res) => {
    const { passphrase } = req.body;
    
    const account = web3.eth.accounts.create();
    const encrypted = account.encrypt(passphrase);

    res.json({
        status: 200,
        address: account.address,
        account
    });
}

const balance = async (req, res) => {
    const { address } = req.params
    
    try {
        const balance = await web3.eth.getBalance(address)
        res.json({
            status: 200,
            balance: parseFloat(balance)
        })
    } catch(error) {
        res.json({
            status: 400
        })
    }
}

const sent = async (req, res) => {
    const { from, to, amount, password } = req.body

    try {
        // Unlocked
        const response = await web3.eth.personal.unlockAccount(from, password, 600)
        const sent = await web3.eth.sendTransaction({
            from: from,
            to: to,
            value: amount
        })

        res.json({
            status: 200
        })
    } catch(error) {
        res.json({
            status: 400
        })
    }
}

const addresses = (req, res) => {
    res.json({
        status: 200
    })
}

const createAddress = (req, res) => {

}

module.exports = {
    create,
    createAddress,
    balance,
    sent,
    addresses
}