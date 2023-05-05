import axios from "axios";
import * as fs from "fs";

// Set the API URL and token
const apiUrl = "https://sandbox-esiunta.dpd.lt/api/v1";
const apiToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6MzU2LCJhZG1pbl9pZCI6bnVsbCwic2lnbmF0dXJlX2lkIjoiNzNlNjg3MzYtZDFmMi00ZDdjLWI1YTAtMDIzNzgzZjJmZTJiIiwic2lnbmF0dXJlX25hbWUiOiJhcGl0b2tlbiIsImlzcyI6ImFtYmVyLWx0IiwiZXhwIjoxMDE2ODMyMTExNDN9.Aadlm52iHi3-AYNtO_akoE46OiwxhJn3I4-1vvSSxRY";

// Set the request headers to include the token
const headers = {
  Authorization: `Bearer ${apiToken}`,
  "Content-Type": "application/json",
};

// Read the JSON file from the local directory
let payloadData = fs.readFileSync("payload", "utf8");

// Parse the file data as JSON and include it in the payload
let payload = JSON.parse(payloadData);

let labelData = fs.readFileSync("label", "utf8");
let label = JSON.parse(labelData);

// Make the API GET request using axios
// axios
//   .get(`${apiUrl}/lockers`)
//   .then((response) => {
//     console.log(response.data);
//     // Handle the API response data here
//   })
//   .catch((error) => {
//     console.log(error);
//     // Handle any errors here
//   });

// Make the API POST request using axios
axios
  .post(`${apiUrl}/shipments`, payload, { headers })
  .then((response) => {
    console.log(response.data);
    // Handle the API response data here
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.error("Request failed with status code", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request failed:", error.request);
    } else {
      // Something else happened in setting up the request
      console.error("Error:", error.message);
    }
  });

axios
  .post(`${apiUrl}/shipments/labels`, label, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.error("Request failed with status code", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("Request failed:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  });
