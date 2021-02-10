const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const shasum = require('js-sha256');
const axios = require('axios');

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

        // if(req.headers['authorization'] !== "Bj5pnZEX6DkcG6Nz6AjDUT1bvcGRVhRaXDuKDX9CjsEs2") {
        //   res.status(500).send({});
        //   return;
        //}

        var url = req.query.url;
        var hash = shasum.create();

        console.log(url);

        var response = await axios.request({
            method: "GET",
            url: url,
            responseType: "stream",
        });
        
        var bytesRead = 0;
        var contentLength = response.headers['content-length'];

        for await (data of response.data) { 

            bytesRead += data.length;
            hash = hash.update(data);
            res.write('' + bytesRead + '/' + contentLength + '$');
        }

        res.write(hash.hex());
        res.end();

    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

let server = app.listen(4322, function() {
    console.log('Server is listening on port 4322')
});
