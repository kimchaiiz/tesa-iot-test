require('dotenv').config();
// Import Data from websocket
const WebSocket = require('ws');
//Improt decode
const decode = require('./decode');
// Websocket

var ws = new WebSocket(process.env.WS_URL);

module.exports = {ws};
	function connectToWebsocket(){
	 	
	 }

//connect to our database
var mongoUse = require('./mongoUse');

mongoUse.connectToServer(function(err){

	ws.on('open', function open() {
	  ws.send('something');
	});

	ws.on('message', function incoming(data) {
	  var _data = JSON.parse(data);
	  //console.log(_data);
	  var obj_data = decode.formatData(_data.data);
	  var obj_timestamp = decode.formatTime(_data.ts);
	  var obj_EUI = {Device_EUI : _data.EUI};
	  var obj = Object.assign(obj_EUI,obj_timestamp, obj_data);

	  //var myJSON = JSON.stringify(obj);
	  //console.log(_data.data)
	  //console.log(obj);
	 seedData(obj);

	  //console.log(myJSON);
	  //console.log(`timestamp = ${obj.ts}`);
	  //console.log(`time = ${formatTime(obj.ts)}`);
	  //console.log(formatData(obj.data));

	});


	//parsing JSON

});


const insetDocument = function(data, db,callback) {
	const collection = db.collection('sensor');
	collection.insert(data,function(err,result){
    console.log("Inserted 1 documents into the collection");
    callback(result);
	});
}


const findDocuments = function(db,callback) {

  // Get the documents collection
  const collection = db.collection('sensor');

  // Find some documents
  collection.find({}).toArray(function(err, docs) {

    callback(docs);
  });
}

// import data to database

var seedData = function(data){
		const db = mongoUse.getDb();
	insetDocument(data,db,function (){
		findDocuments(db,function(err){});
	});  
}



