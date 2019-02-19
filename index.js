var express = require('express');
var app = express();
app.set('view engine', 'ejs');

var db = require('./db.js');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.all('/', (req, res) => {
    res.redirect('/public/form.html');

});
app.use('/public', express.static('public'));
app.use('/mark', (req, res) => {
    var newlocation = new db(req.body);
    newlocation.save(
        (err) => {
            if (err) {
                res.type('html').status(500);
                res.send('Error: ' + err);
            }
            else {
                res.write('Marked new pothole');
                res.end();
            }
        });
    console.log(req.body);
});
app.use('/showmap', (req, res) => {
    db.find({}, (err, locations) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error: ' + err);
        }
        else {
            res.json(locations);
            console.log(locations);
        }
    });

});
app.use('/show', (req, res) => {
    db.find({}, (err, locations) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error: ' + err);
        }
        else {
            res.render('map', { locations: locations });
        }
    });
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});



// Please do not delete the following line; we need it for testing!
module.exports = app;