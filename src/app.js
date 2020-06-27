const express = require('express');
require('./db/mongoose');
const path = require('path');
const userRouter = require('./routers/user');
const countr = require('../public/countries/country.json');
const state = require('../public/countries/state.json');
const { STATES } = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');






const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(bodyParser.json());
app.use(cors());

 app.use(bodyParser.urlencoded({ extended: false }));




app.post('/countrystate/:action', (req, res) => {
  const action = req.param('action');

  if (action === 'country') {
    res.send(countr);
  }
  else if(action === 'state'){
    const country_id = req.body.country_id;
    if(!country_id)
    {
      return res.send(`No country ID`);
    }
    const a = state.filter((state)=>{
     return state.country_id === country_id;
    });
    res.send(a);
  }
  else{
    res.send(`Invalid Parameter`);
  }
});




app.listen(port,()=>{
  console.log(`server up on port ${port}`);
});     

//ngrok http 3000

//return STATES.filter((state)=>{
//return state.country_id === country_id