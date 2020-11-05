/*
*/

const { nextISSTimesForMyLocation } = require('./iss');

const testCallback = (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('PassTimes:', data);
}

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('Coord Data:', data);
// });

// const testCoords = { lat: 38.7936, lon: -90.7854 }
// fetchISSFlyOverTimes(testCoords, testCallback)


const testData = [ 
  { duration: 569, risetime: 1604637656 },
  { duration: 649, risetime: 1604643405 },
  { duration: 562, risetime: 1604649292 },
  { duration: 517, risetime: 1604655194 },
  { duration: 603, risetime: 1604661021 } ];


// nextISSTimesForMyLocation(testCallback)

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});