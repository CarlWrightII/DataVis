var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var meteor = mongoose.model("Sample", new Schema({ //The model based off the data collected
		name : String,  
		nametype : String,
		recclass : String,
		mass : int,
		fall : String,
		year : int,
		id : int,
		reclat : float,
		reclong : float
}), 'newSample')};

function webpage (req, res){

		//finding documents
		meteor.find({}).exec(function(err, result){
			if (!err){
				res.write(html1 + JSON.stringify(result, undefined, 2)  + html2 + result.length + html3);
			}
			else{
				res.end("Error in retreving docs." + err)
			}
		});
}

