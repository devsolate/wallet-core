'use strict'

const express = require('express')
const controller = require('./eth.controller')
const router = express.Router()

router.route('/create')
    .post(controller.create)

router.route('/import')
    .post(controller.create)
    
router.route('/export')
    .post(controller.create)

router.route('/addresses')
    .get(controller.addresses)

router.route('/address')
    .get(controller.addresses)

router.route('/balance/:address')
    .get(controller.balance)

router.route('/transactions')
    .get(controller.addresses)

router.route('/sent')
    .post(controller.sent)

module.exports = router