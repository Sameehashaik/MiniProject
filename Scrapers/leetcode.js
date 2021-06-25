const fetch = require('node-fetch');

module.exports.getleetcode= async function(lcurl,cb) {
var result = {count: ""}
var url = lcurl
var response= await fetch(url);
var data= await response.json()
result.count = data.total_problems_solved
console.log(result.count)
cb(result)
}
