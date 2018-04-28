'use strict'

const Web3 = require('web3');
const Constants = require('../constants');
const Utils = require('./eth.utils')
const web3 = new Web3(Constants.WEB3);
const ETH = require('./eth.model')

// Create Wallet and Return Private Key to Save to Client Side
const create = async (req, res) => {
    const { passphrase, name } = req.body;
    const userId = req.user._id
    
    try {
        const account = web3.eth.accounts.create();
        const encrypted = account.encrypt(passphrase);
        const exportPath = await Utils.exportPrivateKey(userId, encrypted)
        
        const wallet = new ETH({
            privateKeyPath: exportPath,
            userId: userId,
            publicKey: account.address,
            addresses: [
                account.address
            ],
            name: name
        })
        
        const result = await wallet.save()
    -
        res.json({
            status: 200,
            wallet: wallet
        });
    } catch(error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            error
        });
    }
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
    console.log(req.user._id)
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