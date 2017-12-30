const Record = require('../models/record');

	//create some events
	const records = [
	{ board_id: 'AAAA', temperature: 25 , humidity: 15},
	{ board_id: 'AAAA', temperature: 22 , humidity: 17},
	{ board_id: 'BBBB', temperature: 23 , humidity: 19},
	{ board_id: 'BBBB', temperature: 24 , humidity: 16},
	];

module.exports ={
		showRecords : showRecords,
	/*	showSingle : showSingle,*/
	//	seedRecords : seedRecords
}

/**
//show all events
*/
function showRecords(req, res) {
	//get all events
	Record.find({}, function(err, records){
		//return a view with data
	res.render('pages/records',{records:records});
	
	});
}


/*
// show a sigle event
*/
/*
function showSingle(req,res) {
	const event = { name: 'Basketball',slug:'basketball', description: 'Throwing into a basket'};
	res.render('pages/single',{event:event});
}
*/
/**
//seed the database
*/

