const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

require('./app_api/controllers/passport');

/*
//var HOST_IP = "192.168.0.20";
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://" + HOST_IP + ":4200");
    //res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
*/

const accountsRoutes = require('./app_api/routes/accounts.server.routes');
const userRoutes = require('./app_api/routes/user.routes');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

app.use(passport.initialize());

app.use('/api', accountsRoutes);
app.use('/api', userRoutes);

// Set static path to Angular app in dist
// Don't run in dev
if (process.env.NODE_ENV !== "dev") {
    //app.use("/", express.static(path.join("/dist/all-about-hair")));
    app.use("/", express.static(path.join(__dirname, "/dist")));
}

if (process.env.NODE_ENV !== "dev") {
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/dist/index.html"));
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server running'));