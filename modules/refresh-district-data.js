var refresh_data = require('./refresh-data.js');

module.exports = function(req, res, district_data) {

  refresh_data(req, res, district_data, 'http://storage.googleapis.com/co-publicdata/dlall.zip', 'district');
  
}