import dotenv from 'dotenv';
dotenv.config({path: './config.env'});


 import axios from 'axios';
 

import ap from './app.js';
import { connect } from 'mongoose';
import connectDB from './db/index.js';


const app = ap;
const port = process.env.PORT;

 
connectDB().
then(( )=> {   app.listen(process.env.PORT , (req , res) =>{
    console.log(`Server is running on port ${port}`);

})}).catch(err => console.log("MongoDB connection error!!! : " + err));   















app.get('/user/:id', (req, res) => {
    res.send(`<h1> user id is ${req.params.id}</h1>`);
});

app.get('/username/:username', (req, res) => {
    const { username } = req.params;
    axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
            const lin = response.data.avatar_url;

            res.send(`<img src="${lin}" />`);
          
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error fetching user data');
        });
});

app.get('/', (req, res) => {
    res.send("Hello world!!");
});



