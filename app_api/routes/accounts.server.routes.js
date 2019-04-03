const express = require('express');

//import controller file
const accountsController = require('../controllers/accounts.server.controller');

// get an instance of express router
const router = express.Router();

router.get('/accounts/:username', accountsController.getAccount);
router.get('/accounts', accountsController.getAccounts);
router.put('/accounts/withdrawl/:username', accountsController.performWithdrawl);
router.put('/accounts/deposit/:username', accountsController.performDeposit);

module.exports = router;
