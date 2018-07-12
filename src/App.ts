import { Express, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as http from 'http';
import * as config from '../config/config';
import { ApiRouterFactory } from './routes/api-router-factory';
import  * as cors from 'express';

var app = express();
app.use(cors());
var url = config.DB_URL;
mongoose.connect(url, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDb');
    }
});
mongoose.set('debug', true);

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// var cpUpload = upload.fields([{ name: 'upload_logo', maxCount: 1 }, { name: 'upload_attachment'},
// { name: 'upload_project'}])
// app.use(cpUpload);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use('/', ApiRouterFactory.getApiRouter());

var server = http.createServer(app);


server.listen((process.env.PORT || 8080), function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

export default app;
