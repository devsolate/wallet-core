'use strict';

const User = require('./user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Constants = require('../constants')

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
                const token = jwt.sign({
                    username: user.username
                }, Constants.JWT_SECRET_KEY);
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