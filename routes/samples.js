//Getting Smaples

//Get Samples 

var mongoose = require('mongoose')
 , Sample = mongoose.model('Sample');


 exports.list = function(req, res){
 	Sample.find({}, function(err, samples){
 		res.render('samples', {
 			title: 'Meteor Samples',
 			//samples: samples
 		});
 	});
 }

 exports.jsonlist = function(req, res) {
  Sample.find({}, function(err, doc) {
    res.send(doc);
    	title: 'Meteors'  
  });
}