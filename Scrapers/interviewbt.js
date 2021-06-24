const axios =require('axios');
const cheerio= require('cheerio');
module.exports.getInterviewBit= async function(url,cb){
    async function getStats(){
        let ibresponse={rank:'',score:'',streak:''};
        await axios(url).then(response=>{
            const html=response.data;
            const $ =cheerio.load(html);
            let rank=$('div[class = "txt"]').eq(0).text();
            let score=$('div[class = "txt"]').eq(1).text();
            let streak=$('div[class = "txt"]').eq(2).text();
            ibresponse.rank=rank;
            ibresponse.score=score;
            ibresponse.streak=streak;
            cb(ibresponse);
            return ibresponse
        }).catch(console.error);
    }
    let x={};
    async function final(){
        x = await getStats();
        return x;
    }
    await final();
} 