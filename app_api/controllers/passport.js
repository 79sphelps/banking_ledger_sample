const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'accounts.json');

passport.use(new LocalStrategy({
  usernameField: 'username'
}, function(username, password, done)
{
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    const accounts = JSON.parse(data);
    if (accounts[username] != undefined) {
      return done(null, accounts[username]);
    } else {
      return done(null, false, {message: 'Problem with the login'});
    }
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
