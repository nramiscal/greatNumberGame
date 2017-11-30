var app = require("express")();
var path = require("path");
var session = require('express-session');
var PORT = 8000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'codingdojorocks'}));  // string for encryption

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    if (!req.session.number) {
        req.session.number = Math.floor(Math.random() * (100 - 1) + 1);
    }
 res.render("index", {session: req.session});
});

app.post('/process', (req, res) => {
    var guess = req.body.guess;
    var number = parseInt(req.session.number);

    if (guess < number) {
        req.session.message =  `Too low!`;
    }
    else if (guess > number) {
        req.session.message =  `Too high!`;
    }
    else {
        req.session.message = `${req.session.number} was the number!`
    }
    res.render("index", {session: req.session});
})

app.get('/reset', (req, res) => {
    req.session.destroy(() => {
        console.log("Session successfully cleared.");
    });
    res.redirect('/');
})

// tell the express app to listen on port defined above
app.listen(PORT, () => {
 console.log(`listening on port ${PORT}`);
});
