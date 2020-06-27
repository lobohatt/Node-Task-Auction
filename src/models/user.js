const mongoose = require('mongoose');
const validator = require('validator');
const md5 = require('md5');
//const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const { string } = require('@hapi/joi');

const UserSchema = new mongoose.Schema({

 firstname : {
   type: String,
   required: true,
   trim: true
 },

 lastname: {
   type: String,
   required: true,
   trim: true
 },

 email: {
   type: String,
   unique: true,
   trim: true,
   lowercase: true,
   validate(value){
     if(!validator.isEmail(value)){
       throw new Error('Email is invalid');
     }
   }
  },

  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 4,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('Password cannot contain "password')
      }
    }
  },

  mob: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Must be a positive number');
      }
    }
  },

  gender: {
    type:String,
    trim:true,
    required:true
  },

  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
},
{
  timestamps:true
});

/*UserSchema.method('toClient', function () {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});*/

UserSchema.methods.toJSON = function () {
   const user = this;
   const { __v, _id, ...object } = user.toObject();

   object.id = _id;

   return object;

  
};


UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, 'TaskNode', { expiresIn: '1h' }); 
 

  user.tokens = user.tokens.concat({ token: token }); 
  
  await user.save(); 

  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Unable to login');
  }

  if(md5(password) !== user.password){
    throw new Error('Unable to login')
  }


  return user;
};

/*UserSchema.methods.joiValidate = function(obj) {
  const schema = {
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().min(4).max(15).required(),
  };
  return Joi.validate(obj, schema);
};*/

UserSchema.pre('save',async function(next){

  const user = this; 
 
  if(user.isModified('password')){
    user.password = await md5(user.password);
  }

  next();

});



const User = mongoose.model('userform',UserSchema);

module.exports = User







