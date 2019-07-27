var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
router.get('/roll', function (req, res) {
    var max;

    switch (req.query.text) {
        case "":
            max = 20;
            break;
        case "d4":
            max = 4;
            break;
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
        case "help":
            res.json({
                "response_type": "ephemeral",
                "text": "usage: /roll {d6|d8|d10|d12|d20}"
            });
            return;
        default:
            max = -1;
            break;
    }

    if (max == -1) {
        res.json({
            "response_type": "ephemeral",
            "text": "invalid dice type, accepted types: {d6|d8|d10|d12|d20}"
        })
    } else {
        var randomRoll = Math.floor(Math.random() * max + 1);
        res.json({
            "response_type": "in_channel",
            "text": randomRoll
        })
    }
});

app.use('/', router);

app.listen(port);
console.log("Magic happens on port " + port);