const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
// import * as d3 from "d3";
app.use(express.static("dist"));

app.get("/", (request, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
// const ele = d3
//   .select("#app")
//   .selectAll("li")
//   .data(data)
//   .enter()
//   .append("li")
//   .text(function(d) {
//     return d;
//   });


// // create route to get single book by its isbn
// app.get("/books/:isbn", (request, response) => {
//   // make api call using fetch
//   // fetch(
//   //   `http://openlibrary.org/api/books?bibkeys=ISBN:${request.params.isbn}&format=json&jscmd=data`
//   // )
//   //   .then(response => {
//   //     return response.text();
//   //   })
//   //   .then(body => {
//   //     let results = JSON.parse(body);
//       // console.log(results); // logs to server
//       // response.send(results); // sends to frontend
//     });
// });

// create a search route
// app.get("/search", (request, response) => {
//   fetch(`https://api.ratesapi.io/api/latest?base=USD`)
//     .then(response => {
//       return response.text();
//     })
//     .then(body => {
//       let results = JSON.parse(body);
//       console.log(results);
//       response.send(results);
//     });
// });

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`);
});
