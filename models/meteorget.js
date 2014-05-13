var mongoose = require('mongoose')
		, Schema = mongoose.Schema;

mongoose.model('Getdata',
							new Schema({
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
'MeteorData');
