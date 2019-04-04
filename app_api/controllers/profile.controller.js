const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "accounts.json");

// ------------------------------------------------------
// User profile information functions
// ------------------------------------------------------

module.exports.profileRead = function(req, res) {
  if (!req.payload.username) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    fs.readFile(DATA_FILE, (err, data) => {
      const accounts = JSON.parse(data);
      Object.entries(accounts).forEach(([key, value]) => {
        if (key === req.payload.username) {
          res.setHeader("Cache-Control", "no-cache");
          res.status(200).json(accounts[key]);
        }
      });
    });
  }
};
