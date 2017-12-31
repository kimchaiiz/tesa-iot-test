
const data_type_size_map = {} ;
  data_type_size_map["73"] = 2; //barometer
  data_type_size_map["67"]= 2; //temperature
  data_type_size_map["68"]= 1; //humid
  data_type_size_map["71"]= 6; //acc
  data_type_size_map["72"]= 6;//magneto
  data_type_size_map["86"]= 6;//gyro
  data_type_size_map["00"]= 1;//digital input
  data_type_size_map["01"]= 1;//dugital output
  data_type_size_map["88"]= 9;//GPS la-long-Al
const data_type_resolute = {} ;
  data_type_resolute["73"] = 0.1; //barometer
  data_type_resolute["67"]= 0.1; //temperature
  data_type_resolute["68"]= 0.5; //humid
  data_type_resolute["71"]= 1; //mG
  data_type_resolute["72"]= 1;//mGauss
  data_type_resolute["86"]= 0.1;//mdegpersec
  data_type_resolute["00"]= 1;//digital input
  data_type_resolute["01"]= 1;//dugital output
  data_type_resolute["88"]= 0.0001;// la-degree,long-degree,**Al-centimeter
const accelero3d ={};
  accelero3d["0"] = "acc_x";
  accelero3d["1"] = "acc_y";
  accelero3d["2"] = "acc_z";
const magneto3d ={};
  magneto3d["0"] = "mag_x";
  magneto3d["1"] = "mag_y";
  magneto3d["2"] = "mag_z";
const gyro3d ={};
  gyro3d["0"] = "gyc_x";
  gyro3d["1"] = "gyc_y";
  gyro3d["2"] = "gyc_z";
const gps = {};
  gps["0"]= "Latitude";
  gps["1"]= "Longitude";
  gps["2"]= "Altitude";
const data_type_name_map = {} ;
//Sign int
data_type_name_map["67"]= "temperature"; //temperature
data_type_name_map["71"]= accelero3d; //acc
data_type_name_map["72"]= magneto3d;//magneto
data_type_name_map["86"]= gyro3d;//gyro
data_type_name_map["88"]= gps ;// GPS
//Unsign int
data_type_name_map["68"]= "humidnity"; //humid
data_type_name_map["73"] = "pressure"; //barometer
data_type_name_map["00"]= "digital_in";//digital input
data_type_name_map["01"]= "digital_out";//dugital output
  Hex_to_sInt = function(hex,d_type) {
    var num = parseInt(hex, 16);
    if (["67","71","72","86","88"].includes(d_type)) { //Sign
      if (hex.length % 2 != 0) {
            hex = "0" + hex;
        }
        var maxVal = Math.pow(2, hex.length / 2 * 8);
        if (num > maxVal / 2 - 1) {
            num = num - maxVal
        }
        return (Math.round(num*100))/100;

      }else if (["73","68","00","01"].includes(d_type)) {//Unsign
        var num = parseInt(hex, 16);
      }
      return (Math.round(num*100))/100 ;
  }


module.exports  ={
  formatTime : function(timestamp) {
      var obj={};
      if (timestamp===undefined){
      return undefined;
      }
      var date = new Date(timestamp);
      var year = date.getFullYear();
      // Month in range [1, 12]
      var month = date.getMonth() + 1;
      var day = date.getDate();
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = `${year}-${month}-${day} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
      var _date = formattedTime.substr(0,10);
      var _time = formattedTime.substr(11);
      obj["timestamp"] ={ date : _date,time :_time};
      return obj;
  },


//receive payload
  formatData : function(data) {
    if (data===undefined){
      return undefined;
    }
    var obj = {};
    var pressure,temperature,humid,acc_x,acc_y,acc_z,mag_x,mag_y,mag_z,gyc_x,gyc_y,gyc_z,type,value;
    while(true) {
      var _channel = data.substr(0, 2);
      var _type = data.substr(2, 2);
      if (_type in data_type_size_map) {
        var data_str = data.substr(4, data_type_size_map[_type] * 2);
        if (["71","72","86","88"].includes(_type)) { //3d obj
          for(i=0 ; i<3; i++){
            data_str = data.substr(4+4*i,4);
            obj[data_type_name_map[_type][i.toString()]] = {channel : _channel, type : _type , value : Hex_to_sInt(data_str,_type)*data_type_resolute[_type]};
            //obj[data_type_name_map[_type][i.toString()]] = {channel : _channel, type : _type , value : data_str};
          }
        }else {
          obj[data_type_name_map[_type]] = {channel : _channel, type : _type , value : Math.round(100*(Hex_to_sInt(data_str,_type)*data_type_resolute[_type]))/100};//pharseInt=> Convert hex to decimal
        }
        // move data pointer
        data = data.substr(data_type_size_map[_type] * 2 + 4);
      } else {
        console.log("ERROR: unknown data type");
        break;
      }
      if (data.length===0){
        break;
      }
    }
    return obj;
  }
}
