import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import request from 'request';
import moment from 'moment';

import Product from './models/product';
import {
  MONGO_URI, AUTH_SERVICE_URI, PORT
} from './config';

const app = express();
const router = express.Router();

//CORS middleware
function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
}

//AUTH middleware
let validTokens = {};
function auth(req, res, next) {

  if (!req.headers.authorization) {
    res.status(401).send('missing authorization header');
    return;
  }

  const token = req.headers.authorization.replace('bearer ', '');

  if (validTokens[token] && moment(validTokens[token]).add(2, 'hours') > moment()) {
    next();
    return;
  }

  const options = {
    uri: `${AUTH_SERVICE_URI}/validate`,
    method: 'POST',
    json: {
      token
    }
  }

  request.post(options, (err, resp, body) => {
    if (!err && resp.statusCode == 200 && body) {
      validTokens[token] = new Date();
      next();
    } else {
      console.info('not authorized');
      res.status(401).send('not authorized');
    }
  });
}

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(methodOverride());

// Set up mongo connection
mongoose.connect(process.env.MONGO_URI || MONGO_URI);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.info('Connected'));

app.get('/api/v1/product/grouped', auth, function (req, res, next) {

  let aggregate = Product.aggregate();

  // search query
  if (req.query.query || req.query.category) {
    aggregate.append({
      $match: {
        $text: { $search: `${req.query.query} ${req.query.category}` },
      }
    });
  }

  aggregate.append({
    $group: {
      _id: "$productGroupId",
      rets: { $push: '$$ROOT' }
    },
  });


  aggregate.exec((err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    var mappedResult = result.filter(x => x._id).map(item => {

      return item.rets.reduce((prev, curr) => {
        Object.assign(prev, curr);

        prev.colors = prev.colors || [];
        if (prev.colors.filter(x => x.id === curr.color.id).length == 0) {
          prev.colors.push(curr.color);
        }

        prev.sizes = prev.sizes || [];
        if (prev.sizes.filter(x => x === curr.size).length == 0) {
          prev.sizes.push(curr.size);
        }
        return prev;
      }, {});
    });

    console.info(`Loaded ${mappedResult.length} products`);
    res.send(mappedResult);
  });
})

restify.serve(router, Product, {
  private: ['updatedAt', 'createdAt', '__v'],
  totalCountHeader: true,
  preMiddleware: (req, res, next) => { //Middleware that runs before preCreate, preRead, preUpdate and preDelete.
    auth(req, res, next);
  },
  preCreate: (req, res, next) => {
    // console.log(req)
    next()
  },
  preRead: (req, res, next) => {
    // console.log(req)
    next()
  },
  preUpdate: (req, res, next) => {
    // console.log(req)
    next()
  },
  preDelete: (req, res, next) => {
    // console.log(req)
    next()
  }
})

app.use(router);

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});