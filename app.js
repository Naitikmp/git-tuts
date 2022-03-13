const express =require("express");
const app = express();
const request = require("request");
const bodyparser = require("body-parser");
const req = require("express/lib/request");
const https = require("https");
const { response } = require("express");


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/" , function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

const url = "https://us14.api.mailchimp.com/3.0/lists/f4f4aadd62";
const options = {
    method:"POST",
    auth: "nerd_ass:40e08c12f1483a473063ba3485269279-us14"
}


app.post("/" , function(req,res){

    var firstname= req.body.fName;
    var secondname= req.body.lName;
    var email= req.body.email;

    var data={
        members :[
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME :firstname,
                    LNAME :secondname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
}) 


app.post("/failure.html",  function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server started at port 3000");
})


// f4f4aadd62 dbdfbdgdgd

// 40e08c12f1483a473063ba3485269279-us14