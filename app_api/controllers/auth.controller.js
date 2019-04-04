const passport = require("passport");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const DATA_FILE = path.join(__dirname, "accounts.json");

const sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// ------------------------------------------------------
// Registration/login functions
// ------------------------------------------------------

module.exports.register = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    sendJSONResponse(res, 400, { message: "All fields required" });
    return;
  }

  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, "sha512")
    .toString("hex");

  fs.readFile(DATA_FILE, (err, data) => {
    const accounts = JSON.parse(data);
    let _username = req.body.username;
    let newAccount = {
      _id: "5ca3a9fef95e060b10291930",
      account: 0,
      username: req.body.username,
      hash: salt,
      salt: hash,
      balance: 0,
      transactions: []
    };
    accounts[_username] = newAccount;
    fs.writeFile(DATA_FILE, JSON.stringify(accounts, null, 4), () => {
      let expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);

      let token = jwt.sign(
        {
          _id: this._id,
          username: req.body.username,
          exp: parseInt(expiry.getTime() / 1000)
        },
        "MY_SECRET"
      );

      res.status(200);
      res.json({ token: token });
    });
  });
};

module.exports.login = function(req, res) {
  if (!req.body.username || !req.body.password) {
    sendJSONResponse(res, 400, { message: "All fields required" });
    return;
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(404).json(err);

    if (user) {
      let expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);

      let token = jwt.sign(
        {
          _id: this._id,
          username: req.body.username,
          exp: parseInt(expiry.getTime() / 1000)
        },
        "MY_SECRET"
      );

      res.status(200);
      res.json({ token: token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
