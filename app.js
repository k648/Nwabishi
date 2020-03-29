//jshint esversion : 6

require('dotenv').config();
const express = require ("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
res.sendFile(__dirname + "/index.html")
})

app.post('/',(req,res)=>{
    const query=req.body.cityName;
   const apikey=process.env.API_KEY;
    const unit = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey  + "&units=" + unit;
    
    https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on("data",function(data){
    
        const weatherData = JSON.parse(data)
        console.log(weatherData)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write("<h1>The temperature in " + query + "   is " +  temp   +  "  degrees celcius.</h1>");
        res.write("<img src=" + imageURL +">")
        res.send()
        });
      });
})


app.listen(3000, ()=>{

    console.log("Server is running on port 3000.");

})