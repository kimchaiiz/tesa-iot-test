const db = require('./../../index');


module.exports ={
		showRecords : showRecords,
	/*	showSingle : showSingle,*/
		
}

/**
//show all events
*/

function showRecords(req, res) {
    
db.FindinCol1().then(function(items) {
  console.info('The promise was fulfilled with items!', items);
}, function(err) {
  console.error('The promise was rejected', err, err.stack);
});
res.render('pages/records',{items:items});
}


/*function showRecords(req, res) {
	//get all events
	const items= db.FindCol(function(err,items){
		//return a view with data
		res.render('pages/records',{items:items});
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


