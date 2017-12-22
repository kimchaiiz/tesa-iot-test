const mongoose = require('mongoose'),
Schema = mongoose.Schema;

//create a schema
	const recordSchema = new Schema({
		board_id: String,
		temperature: Number,
		humidity: Number

	});

//middleware

//create the model
	const recordModel = mongoose.model('Record',recordSchema);

//export the model
	module.exports = recordModel;