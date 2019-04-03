const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "accounts.json");

module.exports.getAccounts = async (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
};

module.exports.getAccount = async (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const accounts = JSON.parse(data);
    res.setHeader("Cache-Control", "no-cache");

    if (accounts[req.params.username] != undefined) {
      return res.status(200).json(accounts[req.params.username]);
    } else {
      return res.status(400).json(err);
    }
  });
};

// createTransaction

module.exports.performWithdrawl = async (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const accounts = JSON.parse(data);

    if (accounts[req.params.username] != undefined) {
      accounts[req.params.username].balance =
        parseInt(accounts[req.params.username].balance) -
        parseInt(req.body.amount);
      accounts[req.params.username].transactions.push({
        type: "withdrawl",
        date: new Date(),
        amount: parseInt(req.body.amount)
      });
    }

    fs.writeFile(DATA_FILE, JSON.stringify(accounts, null, 4), () => {
      res.json({});
    });
  });
};

module.exports.performDeposit = async (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const accounts = JSON.parse(data);

    if (accounts[req.params.username] != undefined) {
      accounts[req.params.username].balance =
        parseInt(accounts[req.params.username].balance) +
        parseInt(req.body.amount);
      accounts[req.params.username].transactions.push({
        type: "deposit",
        date: new Date(),
        amount: parseInt(req.body.amount)
      });
    }

    fs.writeFile(DATA_FILE, JSON.stringify(accounts, null, 4), () => {
      res.json({});
    });
  });
};
