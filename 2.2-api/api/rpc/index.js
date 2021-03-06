const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const replies = require('./replies');

const users = [];



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.post("/", function(req, res) {
    let method = req.body.method;
    let params = req.body.params;
    let id = rand(0, 99);
    let reply = {
        result: null,
        error: null
    };

    if (method !== undefined) {
        reply = replies[method](params, users);
    } else {
        reply.error = `Unknown method`;
    }

    res.json({
        "jsonrpc": "2.0",
        "result": reply.result,
        "error": reply.error,
        "id": id
    });
});


function rand(min, max) {
    return Math.ceil((max - min + 1) * Math.random()) + min - 1;
}
