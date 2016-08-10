import express = require("express");
import path = require("path");
import favicon = require("serve-favicon");
import logger = require("morgan");
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");

const appRoutes = require("./routes/appRoutes");
const userRoutes = require("./routes/userRoutes");
const catchAllRoutes = require("./routes/catchAllRoutes");

import * as mongoConfig from "./config/mongodb";

export const app = express();

// Connect to the database.
mongoConfig.connect();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Only turn on logging if we are not in the test environment.
if (process.env.NODE_ENV !== "test") {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

app.use('/', appRoutes);
app.use('/users', userRoutes);
app.use('*', catchAllRoutes);

