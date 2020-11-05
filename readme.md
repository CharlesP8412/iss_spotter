##Must use REQUEST

###ISS
 ####Makes a single API request to retrieve the user's IP address.
 #####Input:
   - A callback (to pass back an error or the IP string)
 Returns (via Callback):
   - An error, if any (nullable)
   - The IP address as a string (null if error). Example: "162.245.144.188"
 
  ipify API Address:
  https://api.ipify.org?format=json
  Example Output  {132.123.321.147}
