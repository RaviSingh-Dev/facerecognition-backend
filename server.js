const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register.js');
const signin=require('./controller/signin.js');
const profile=require('./controller/profile.js');
const image=require('./controller/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res)=> {
  res.send('working');
})


app.post('/register', (req,res) => {register.handleRegister(req,res,bcrypt,db)});

app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)});
	
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)});

app.put('/image', (req,res) => {image.handleImageUpdate(req,res,db)});

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
