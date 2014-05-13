var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var meteor = mongoose.model("Sample", new Schema({ //The model based off the data collected
		name : String,  
		nametype : String,
		recclass : String,
		mass : Number,
		fall : String,
		year : Number,
		id : Number,
		reclat : Number,
		reclong : Number,
		_id:String
}),
'Sample');




