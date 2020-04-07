const test = require('tape');
const cab = require('./');

const main = async () => {
  cab.setUser('phoneNumber', '');
  // cab.getBikeInfo(2774);
  cab.getCustomerInfo();
  //cab.rent(1337);
  //cab.returnBike(1337);
};

main();
