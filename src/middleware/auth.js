const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const redis = require('redis');






const auth = async (req, res, next) => {
  try {
    const client = redis.createClient();

    client.on('error', function (error) {
      console.error(error);
    });
    // const token = req.cookies['auth_token']
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'TaskNode');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    client.set('token', token, function (err, reply) {
      res.send(reply);
    });
    client.set('id', user.id, function (err, reply) {
      res.send(reply);
    });
    client.get('token', function (err, reply) {
      res.send(reply);
    });

    client.get('id', function (err, reply) {
      res.send(reply);
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send('error: Please authenticate.');
  }
};

module.exports = auth;
