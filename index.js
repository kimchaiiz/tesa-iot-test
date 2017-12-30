require('dotenv').config();
// Import Data from websocket
const WebSocket = require('ws');
//Improt decode
const decode = require('./decode');
// Websocket
const ws = new WebSocket(process.env.WS_URL);

//connect to our database

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.DB_URI;
const insetDocument = function(data, db,callback) {
	const collection = db.collection('sensor');
	collection.insert(data,function(err,result){
    console.log("Inserted 1 documents into the collection");
    callback(result);
	});
}



//Export Module
module.exports ={
	FindCol: function() {
	MongoClient.connect(MONGO_URL, function(err, client) {
  var db = client.db('test-tesa-iot');
  var collection = db.collection('sensor');
  collection.find().limit(5).toArray(function (err,items) {
  	return items;
  });
  
  
});
}
}

/*
module.exports = {
  FindinCol1: function() {
    return MongoClient.connect(MONGO_URL).then(function(client) {
      var collection = db.collection('sensor');
      
      return collection.find().sort(limit 5).toArray();
    }).then(function(items) {
      console.log(items);
      return items;
    });
  }
}
*/
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
	
	MongoClient.connect(MONGO_URL, (err, client) => { 
		const db = client.db('test-tesa-iot');
	insetDocument(data,db,function (){
		findDocuments(db,function(){
			client.close();
		});
	});  
});
//		var collection = db.collection('sensor');
//  collection.find().limit(5).toArray(function (err,items) {
//  	return items;
//  });
//  console.log(items);
}


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
  console.log(_data.data)
  console.log(obj);
  seedData(obj);

  //console.log(myJSON);
  //console.log(`timestamp = ${obj.ts}`);
  //console.log(`time = ${formatTime(obj.ts)}`);
  //console.log(formatData(obj.data));

});


//parsing JSON