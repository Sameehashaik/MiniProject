const axios =require('axios');
const cheerio= require('cheerio');

module.exports.getHackerearth=async function(url,cb){
    async function getStats(){
        let userstats=[];
        await axios(url).then(response=>{
            const html=response.data;
             const $ = cheerio.load(html)
            //let rating = $('.userbox').first().find('ul > li >span').eq(0).text().trim();
            //let solved=($('._UserActivityFrame_counterValue').eq(0).text()).split(" ")[0];
            let solved = $('tr[class="dark regular weight-600"]').find('td').eq(0).text()
           // console.log(solved)
            userstats=[solved];

        }).catch(console.error);
        return userstats;

    }
    let response={count:''};
    let x=[]
    async function final(){
        x = await getStats();
        //console.log(x);
       // response.rating=x[0];
        response.count=x[0];
          cb(response);
          return x;
    }
    console.log(await final());
}
