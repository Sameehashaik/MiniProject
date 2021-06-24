    var lcurl ='https://competitive-coding-api.herokuapp.com/api/leetcode/DEEPAK_NADIMINTI'
    console.log("Hello from JS");
    $.ajax({
        url:lcurl,
        type:'GET',
        sucess:function(res){
            console.log(res.total_problems_submitted)
            document.getElementById("lcc").innerHTML=res.total_problems_submitted;
        }
    })
    console.log("Jquery complete");
