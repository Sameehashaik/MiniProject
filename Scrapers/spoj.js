
const axios =require('axios');
const cheerio = require('cheerio');
const got = require('got');
const { html } = require('cheerio/lib/static');

module.exports.getspoj=async function(url,cb){
    var result = {score:""}
    got(url).then(response =>{
    const $ = cheerio.load(response.body);
    console.log($('.dl-horizontal').find('dl > dd').first().eq(0).text().trim());
    result.score = $('.dl-horizontal').find('dl > dd').first().eq(0).text().trim()
    cb(result)
}).catch(err=>{
    console.log("ERR : "+err);
});
}

