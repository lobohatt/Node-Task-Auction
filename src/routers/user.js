  const express = require('express');
  const router = new express.Router();
  const User = require('../models/user.js');
  const Joi = require('@hapi/joi');
  const auth = require('../middleware/auth');
  const details = require('country-state-picker');
  const  redis = require('redis');
  const country = require('country-state-picker');
 const {userslist} = require('../controller/base');




  router.post('/users', async (req,res)=>{

    const schema = Joi.object().keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().min(4).required(),
      mob:Joi.number().integer(),
      gender:Joi.string()
    });

    const {error,value} = schema.validate(req.body);

    if(error) throw new Error(`error ${error.message}`);

   const user = new User(req.body);    
  
    try {

      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({user,token})
    }catch(e){
      res.status(400).send(e)
    }
  });

  router.post('/users/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user: user, token: token });
      res.send(user);
    } catch (e) {
      res.status(400).send();
    }
  });

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/*router.get('/all',async(req,res)=>{

  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;

try {
  const users = await User.find({gender:'M'}).sort({updatedAt: 1}).limit(limit).skip(limit*page);
  const count = await User.find({gender:'M'}).sort({updatedAt: 1}).limit(limit).skip(limit*page).countDocuments();
  res.send({
    users,count
  });
}catch(e){
  res.status(500).send('No users');
}
  
});*/

router.get('/all',userslist);








  module.exports = router


  //password: Joi.string().min(3).max(15).required(),
  //password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })


  /*const data = req.body;

    const schema = Joi.object().keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string().min(4).max(15).required()  
    });

    Joi.validate(data,schema,(err,value)=>{
    
    });
  */


  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI5MjAwOGQzMWYxZDFiM2M4OThjM2EiLCJpYXQiOjE1ODkxOTA2NjR9.J3wvDskuChYblXHkplu84zxzD9_GJgoyxrBjRi_McxA