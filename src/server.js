const express = require('express')
const basicAuth = require('basic-auth')
const path = require('path');
const app = express()


var auth = function (req, res, next) {
    var user = basicAuth(req);
    if (user && user.name == "admin" && user.pass == "admin")
        return next();
    else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }
}

app.use(function (req, res, next) {
    if (req.url.indexOf('files') != -1) {
        console.log(req.url);
        return auth(req, res, next);
    }
    else
        next();
});

app.use('/files', auth, express.static(path.join(__dirname, 'files')));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(9000)


