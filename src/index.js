import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';

import Product from './models/Product';
import {MONGO_URI} from './config';

const app = express();
const router = express.Router();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(methodOverride());

// Set up mongo connection
mongoose.connect(process.env.MONGO_URI || MONGO_URI);

const port = process.env.PORT || 5005;
restify.serve(router, Product);

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
