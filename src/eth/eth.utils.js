'use strict'

const fs = require('fs')
const random = require('randomstring')
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

const ethPrivateKeyPath = './store/eth/'

const exportPrivateKey = (userId, privateKey) => {
    return new Promise((resolve, reject) => {
        const filePath = ethPrivateKeyPath + userId + '/' + random.generate(10) + '.pri'
        mkdirp(getDirName(filePath), (err) => {
            if(err) {
                return reject(err)
            }

            fs.writeFile(filePath, privateKey, function(err) {
                if(err) {
                    return reject(err)
                }
            
                return resolve(filePath)
            });
        })
    })
}

module.exports = {
    exportPrivateKey
}