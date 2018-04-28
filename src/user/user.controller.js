'use strict';

const User = require('./user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Constants = require('../constants');
const moment = require('moment');
const Token = require('../token/token.model')

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body

    try {
        const user = await User.findOne({
            username: username
        })
        if (user) {
            const isPasswordCorrect = await user.comparePassword(password);
            if(isPasswordCorrect) {
                const timestamp = moment().valueOf();
                const token = jwt.sign({
                    _id: user._id,
                    username: user.username,
                    timestamp: timestamp
                }, Constants.JWT_SECRET_KEY);

                await Token.create({
                    token: token,
                    username: user.username,
                    timestamp: timestamp,
                    isRevoked: false
                });

                res.json({
                    status: 200,
                    token: token
                })
            } else {
                res.status(401).json({
                    status: 400,
                    error: 'Username or Password is incorrect'
                })
            }
        } else {
            res.status(401).json({
                status: 400,
                error: 'Username or Password is incorrect'
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            error
        })
    }
}

const register = async (req, res) => {
    const {
        username,
        password
    } = req.body

    try {
        const user = await User.create({
            username,
            password
        })
        res.json({
            status: 200,
            user
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            error
        })
    }
}

module.exports = {
    login,
    register
}