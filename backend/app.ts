import express = require("express");
import path = require("path");
import favicon = require("serve-favicon");
import logger = require("morgan");
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");
import expressJWT = require("express-jwt");
import jwt = require("jsonwebtoken");

const appRoutes = require("./routes/app.routes");
const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");
const catchAllRoutes = require("./routes/catchAll.routes");

import * as mongoConfig from "./config/mongodb";

export const app = express();

// Connect to the database.
mongoConfig.connect();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressJWT({secret: 'L33tWallahWallah'}).unless({path:
    ['/', '/login','/create-user' ,'/users/create-user', '/app',
        /^(\/users\/)(.)*/,
        /^(\/js\/)(.)*/, '/systemjs.config.js' ]}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

app.use('/', appRoutes);
app.use('/users', userRoutes);
app.use('/home', homeRoutes);
app.use('*', catchAllRoutes);

