//const index = require('./../../index');
//var index.connectToServer(function(err){});
//var collection = index.collection('')
var mongoUse = require('./../../mongoUse');

module.exports ={
		showDatas : showDatas,
		testDatas : testDatas,
		showDashboard : showDashboard
}
// show Dashboard
function showDashboard(req,res){
	var db=mongoUse.getDb();
	db.collection('sensor').find().sort({_id:-1}).limit(10).toArray(function(err,datas){
  	//console.log(data);
  	//return documents = data;
  	//return a view with data
  	res.render('pages/dashboard',{datas:datas});
  });
}

//show all datas

function showDatas(req, res) {
	//get all events
	var db = mongoUse.getDb();
	db.collection('sensor').find().sort({_id:-1}).limit(100).toArray(function(err,datas){
  	//console.log(data);
  	//return documents = data;
  	//return a view with data
  	res.render('pages/datas',{datas:datas});
  });
}

function testDatas(req, res) {
	//get all events
	datas = [
	{ Device_EUI: 'AAAA', temperature: 10 , humidity: 15},
	{ Device_EUI: 'AAAA', temperature: 22 , humidity: 17},
	{ Device_EUI: 'BBBB', temperature: 23 , humidity: 19},
	{ Device_EUI: 'BBBB', temperature: 24 , humidity: 16},
	];
  	res.render('pages/test',{datas:datas});
  
}