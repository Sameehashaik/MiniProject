const axios =require('axios');
const cheerio= require('cheerio');

module.exports.getCodechef=async function(url,cb){
    async function getStats(){
       // let userstats=[];
        let ccresponse = {stars:'',rating:'',solved:''}
        await axios(url).then(response=>{
            const html=response.data;
            const $ = cheerio.load(html)
            let stars = ($('.rating').text()[0]);
            let rating=$('.rating-number').text();
            let solved=$('section[class="rating-data-section problems-solved"]').find('div > h5').text();
            ccresponse.stars = stars
            ccresponse.rating = rating
           
            var x =solved;
            var y=x.split(' ')
            var l=y[2];
            var count="";
            for(let i=1;i<l.length;i++)
            {
                    if(l[i]==')')
                    break;
                count+=l[i];
            }
            ccresponse.solved = count
            cb(ccresponse)
            return ccresponse
        }).catch(console.error);
      //  return userstats;
     
    }
    let x={}
    async function final(){
        x = await getStats();
        return x;
    }
   await final();
}
// let res = await  getStats();
// console.log('final result ',res);