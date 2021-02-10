const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const cors = require('cors');
const shasum = require('js-sha256');
const fetch = require('node-fetch');
const request = require('request');

var corsOptions = {
  origin: '*',
}

let app = express();
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/', async function(req, res) {

    try {
        console.log(req.headers);

        if(req.headers['authorization'] !== "Bj5pnZEX6DkcG6Nz6AjDUT1bvcGRVhRaXDuKDX9CjsEs2") {
           res.status(500).send({});
        }



        var url = req.query.url;
        var hash = shasum.create();

        console.log(url);

        request(url).pipe(res);

    } catch(err) {
       res.status(500).send(err);
    }
});

let server = app.listen(4322, function() {
    console.log('Server is listening on port 4322')
});
