/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 *
 *     https://api.ipify.org?format=json
 *   ie  {132.123.321.147}
 *
 * 23.233.53.153
 * 
 * // { lat: 38.7936, long: -90.7854 }
 * // http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON
 */
const { Console } = require('console');
const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;

    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    if (data.length !== 0) {
      const ipAddr = data.ip;
      // console.log(ipAddr)
      callback(null, ipAddr);
      return;

    }
    callback('REQUEST: No Data found', null);
  });
};



const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {


      const data = JSON.parse(body);
      if (data.length !== 0) {
        const coords = {
          lat: data.latitude,
          lon: data.longitude
        };
        callback(null, coords);
        return;
      }
    }
  });
};



const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // Array of objects
    const passesData = JSON.parse(body).response;
    // console.log('RAW', data)
    callback(null, passesData);

  });
};


const passData = [
  { duration: 569, risetime: 1604637656 },
  { duration: 649, risetime: 1604643405 },
  { duration: 562, risetime: 1604649292 },
  { duration: 517, risetime: 1604655194 },
  { duration: 603, risetime: 1604661021 }];


  const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchCoordsByIP(ip, (error, loc) => {
        if (error) {
          return callback(error, null);
        }
  
        fetchISSFlyOverTimes(loc, (error, nextPasses) => {
          if (error) {
            return callback(error, null);
          }
  
          callback(null, nextPasses);
        });
      });
    });
  };



module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};




//CALL BACK HELL

 // const fetchMyIP = function (callback) {
  //   // use request to fetch IP address from JSON API

  //   request('https://api.ipify.org?format=json', (error, response, body) => {
  //     if (error) {
  //       callback(error, null);
  //       return;

  //     }

  //     if (response.statusCode !== 200) {
  //       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  //       callback(Error(msg), null);
  //       return;
  //     }

  //     const data = JSON.parse(body);
  //     if (data.length !== 0) {
  //       const ipAddr = data.ip;
  //       // console.log(ipAddr)

  //       const fetchCoordsByIP = function (ip, callback) {
  //         request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
  //           if (error) {
  //             callback(error, null);
  //             return;
  //           } else if (response.statusCode !== 200) {
  //             const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  //             callback(Error(msg), null);
  //             return;
  //           } else {


  //             const data = JSON.parse(body);
  //             if (data.length !== 0) {
  //               const coords = {
  //                 lat: data.latitude,
  //                 lon: data.longitude
  //               };


  //               const fetchISSFlyOverTimes = function (coords, callback) {
  //                 request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`, (error, response, body) => {
  //                   if (error) {
  //                     callback(error, null);
  //                     return;
  //                   } else if (response.statusCode !== 200) {
  //                     const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  //                     callback(Error(msg), null);
  //                     return;
  //                   }
  //                   // Array of objects
  //                   const passesData = JSON.parse(body).response;
  //                   // console.log('RAW', data)

  //                   callback(null, passesData);

  //                 });
  //               };



  //               return;
  //             }
  //           }
  //         });
  //       };



  //     }
  //     callback('REQUEST: No Data found', null);
  //   });


  // };

