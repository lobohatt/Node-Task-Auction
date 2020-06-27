  // Three Methods

const User = require('../models/user.js');

//const auth = require('../middleware/auth');

exports.userslist =  async(req,res) =>{

  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const filter = req.query.keyword || '';
  //firstname: { $regex: req.query.keyword, $options: 'i' }

try {
  const users = await User.find({ firstname: { $regex: filter, $options: 'i' }})
    .sort({ createdAt: 1})
    .limit(limit)
    .skip(limit * page);
  const count = await User.find({ firstname: { $regex: filter, $options: 'i' }})
    .sort({ createdAt: 1 })
    .limit(limit)
    .skip(limit * page)
    .countDocuments();
  res.send({
    users,
    count,
  });
} catch (e) {
  res.status(500).send('No users');
}
}



/*const userslist = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const users = await User.find({ gender: 'M' })
      .sort({ createdAt: 1 })
      .limit(limit)
      .skip(limit * page);
    const count = await User.find({ gender: 'M' })
      .sort({ updatedAt: 1 })
      .limit(limit)
      .skip(limit * page)
      .countDocuments();
    res.send({
      users,
      count,
    });
  } catch (e) {
    res.status(500).send('No users');
  }
};

exports.userslist = userslist;*/



/*module.exports.userslist = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const users = await User.find({ gender: 'M' })
      .sort({ updatedAt: 1 })
      .limit(limit)
      .skip(limit * page);
    const count = await User.find({ gender: 'M' })
      .sort({ updatedAt: 1 })
      .limit(limit)
      .skip(limit * page)
      .countDocuments();
    res.send({
      users,
      count,
    });
  } catch (e) {
    res.status(500).send('No users');
  }
};*/


/*module.exports = {
  getName: () => {
    return 'Jim';
  },

  getLocation: () => {
    return 'Munich';
  },

  dob: '12.01.1982',
};*/

/*const { getName, dob } = require('./user');
console.log(
  `${getName()} was born on ${dob}.`
);*/













//---------------------------------------//

/*exports.userslist =  async(req,res) =>{

  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

try {
  const users = await User.find({},{sort:{firstname:req.query.hint}})
    .sort({ updatedAt: 1 })
    .limit(limit)
    .skip(limit * page);
  const count = await User.find({}, { sort: { firstname: req.query.hint } })
    .sort({ updatedAt: 1 })
    .limit(limit)
    .skip(limit * page)
    .countDocuments();
  res.send({
    users,
    count,
  });
} catch (e) {
  res.status(500).send('No users');
}
}*/





