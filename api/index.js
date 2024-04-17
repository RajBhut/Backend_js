
require('dotenv').config()

const axios = require('axios');

const express = require('express');

const app = express();
const port = process.env.PORT;

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

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});

