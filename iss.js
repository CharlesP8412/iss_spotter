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
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
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
        const ipAddr = data.ip;
        // console.log(ipAddr)
        callback(null, ipAddr);
        return;
      }
      callback('REQUEST: No Data found', null);
      return;

    }
  });
};



const fetchCoordsByIP = function(ip, callback) {
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
          long: data.longitude
        };
        callback(null, coords);
        return;
      }
    }
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };
