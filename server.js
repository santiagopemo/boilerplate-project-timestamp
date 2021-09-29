// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let responseObj = {};
  responseObj['unix'] = new Date(req.params.date).getTime(),
  responseObj['utc'] = new Date(req.params.date).toUTCString()
  if (!responseObj['unix'] || !responseObj['utc']) {
    responseObj['unix'] = new Date(parseInt(req.params.date)).getTime(),
    responseObj['utc'] = new Date(parseInt(req.params.date)).toUTCString() 
  }
  if (!responseObj['unix'] || !responseObj['utc']) {
    res.json({error: "Invalid Date"});
  } else {
    res.json(responseObj);
  }
});

app.get('/api', function (req, res) {
  const responseObj = {
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
  };
  res.json(responseObj);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
