const axios =require('axios');
const cheerio= require('cheerio');

module.exports.getCodechef=async function(url,cb){
    async function getStats(){
        let userstats=[];
        await axios(url).then(response=>{
            const html=response.data;
            const $ = cheerio.load(html)
            let stars = ($('.rating').text()[0]);
            let rating=$('.rating-number').text();
            let solved=$('section[class="rating-data-section problems-solved"]').find('div > h5').text();
            // console.log(stars)
            // console.log(rating);
            // console.log(solved)
            userstats=[stars,rating,solved];
            //console.log('Inside function',userstats);
            //return userstats;
        }).catch(console.error);
        return userstats;
    }
    let response={stars:'',rating:'',count:''};
    let x=[]
    async function final(){
        x = await getStats();
        //console.log(x);
        response.stars=x[0];
        response.rating=x[1];
        response.count=x[2];
        cb(response);
        return x;
    }
    console.log(await final());
}
// let res = await  getStats();
// console.log('final result ',res);