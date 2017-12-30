require('dotenv').config();

//connect to our database
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.DB_URI;
var ObjectId = require('mongodb').ObjectID;

var _db;

//Export Module
module.exports = {connectToServer,getDb};

	function connectToServer(callback){
	 	MongoClient.connect(MONGO_URL, function(err, client) {
	  _db = client.db('test-tesa-iot');
	  return callback(err);
	  
	  });
	 }

 	function getDb(){
 		return _db;
 	}










