var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csv = require('csv');
var mongoose = require('mongoose');
var fs = require('fs');
var routes = require('./routes/index');
var users = require('./routes/users');
var http = require('http');


var records = [];
var app = express();
csv(records)
   .from.stream(fs.createReadStream(__dirname + '/meteorites-updated_05-14-13.csv'), //Links to csv file reading from
   {
   columns: true
})
   .on('record', function (row, index) {
   records.push(row);

   //console.log(row);
})
  .on('end', function (count) {
  var MongoClient = require('mongodb').MongoClient;
   // Connect to the db
   MongoClient.connect("mongodb://localhost:27017/MeteorDB", function (err, db) //New Database
    {
      var collection = db.collection('sample.js') //New Collection:Sample
      collection.insert(records, function (err, doc) 
      {
         console.log(doc);
      });
   });
   console.log("Number of lines: " + count);
});
  



//Mongoose Connnections
//mongoose.connect("mongodb://localhost:27017/MeteorDB");
//require('./models/sample');

// view engine setup
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("listening on port" + app.get('port'));
});
module.exports = app;