var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: "hooray! welcome to our api!" });
});

router.get('/roll', function (req, res) {
    var max = -1;
    switch (req.query.type) {
        case "d6":
            max = 6;
            break;
        case "d8":
            max = 8;
            break;
        case "d10":
            max = 10;
            break;
        case "d12":
            max = 12;
            break;
        case "d20":
            max = 20;
            break;
        default:
            max = 20;
            break;
    }

    var randomRoll = Math.floor(Math.random() * max + 1);
    res.json({ message: randomRoll});
});

app.use('/api', router);

app.listen(port);
console.log("Magic happens on port " + port);