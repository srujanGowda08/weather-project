const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");



app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});


app.post("/",function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=b366c889560539fae5999496200ec558#&unit=imperial";
    
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            console.log(data);
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const temp = weatherdata.main.temp;
            console.log(temp);
            const description = weatherdata.weather[0].description;
            console.log(description);

            var cname = req.body.cityName;
            const icon = weatherdata.weather[0].icon
            const url = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The temprature in " + cname +" is "+temp +" degree celcious.</h1>");
            res.write("<h1>The weather description in India is "+description +".</h1>");
            res.write("<img src="+url+">");
            res.send();
        })
    });
})





app.listen(process.env.PORT ||3000,()=>{
    console.log("Server started!!")
})