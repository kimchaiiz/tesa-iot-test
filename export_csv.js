var mongoUse = require('./mongoUse');
var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['_id', 'Device_EUI','pressure.value','temperature.value','humidnity.value'];
module.exports = {save_csv};
	function save_csv(){
//connect database
mongoUse.connectToServer(function(err){
var db = mongoUse.getDb();
  db.collection('sensor').find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    var csv = json2csv({ data: result, fields: fields });
    fs.writeFile('file.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
    });
  });
});

}