const redis = require('redis');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const client = redis.createClient();

client.on('error', function (error) {
  console.error(error);
});

const redisAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'TaskNode');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    client.set('token', token,function(err,reply){
      console.log(reply);
    });
    client.get('token', function (err, reply) {
      console.log(reply);
    });
    client.set('id', user.id, redis.print);

    if (!user) {
      throw new Error();
    }

    next();
  } catch (e) {
    res.status(401).send('error: Please authenticate.');
  }
};

module.exports = redisAuth;



//6379