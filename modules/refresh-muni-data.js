var refresh_data = require('./refresh-data.js');

module.exports = function(req, res, muni_data) {

  refresh_data(req, res, muni_data, 'http://storage.googleapis.com/co-publicdata/MuniBounds.zip', 'muni');
  
}