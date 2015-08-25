const url = 'https://xml.dbcarsharing-buchung.de/hal2_cabserver/definitions/HAL2_CABSERVER_3.wsdl';
const soap = require('soap');

const lang = {
  German: 1,
  English: 2
};

var cabClient;

const commonParams = {
  customerData: {
    User: 't_cab_android',
    Password: '3b3cc28469'
  },
  languageUID: lang.German,
  RequestTime: getCurrentDate(),
  Version: 1
};

var customerData = {};


exports.setUser = setUser;
exports.getCustomerInfo = getCustomerInfo;
exports.getBikeInfo = getBikeInfo;
exports.rent = rent;


function setUser(phone, password) {
  customerData.Phone = phone;
  customerData.Password = password;
}

function rent(bikeId) {
}

function getCustomerInfo() {
  request('CABSERVER.getCustomerInfo', {
    CommonParams: commonParams,
    CustomerData: customerData
  });
}

function rent(bikeNumber) {
  request('CABSERVER.rentBike', {
    CommonParams: commonParams,
    CustomerData: customerData,
    BikeNumber: bikeNumber
  });
}

function getBikeInfo(bikeId) {
  request('CABSERVER.getBikeInfo', {
    CommonParams: commonParams,
    Bike: bikeId
  });
}

function request(endpoint, args) {
  if (cabClient) {
    invoke(cabClient, endpoint, args);
  }
  soap.createClient(url, function(err, client) {
    if (err) {throw err;}
    cabClient = client;
    invoke(cabClient, endpoint, args);
    //console.log(cabClient);
  });
}

function invoke(client, endpoint, args) {
  args = args || {};
  return client[endpoint](args, function(err, result) {
    if (err) {throw err;}
    console.log(result);
  });
}

// helper
function getCurrentDate() {
  var date = new Date();
  return date;
}


