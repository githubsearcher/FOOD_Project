"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const config = require("../config/config");
const api_router_factory_1 = require("./routes/api-router-factory");
const cors = require("express");
var app = express();
app.use(cors());
var url = config.DB_URL;
mongoose.connect(url, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});
mongoose.set('debug', true);
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// var cpUpload = upload.fields([{ name: 'upload_logo', maxCount: 1 }, { name: 'upload_attachment'},
// { name: 'upload_project'}])
// app.use(cpUpload);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use('/', api_router_factory_1.ApiRouterFactory.getApiRouter());
var server = http.createServer(app);
server.listen((process.env.PORT || 8080), function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
exports.default = app;
