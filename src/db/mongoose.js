const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,{
 
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex:true,
 useFindAndModify:true
});

//mongodb://127.0.0.1:27017/task-project