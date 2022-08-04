const express = require('express');
const app = express();
const https = require('node:https');

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use('/assets', express.static('assets'));

app.get("/", function(request,response){
  let kanyeSays;
  https.get("https://api.kanye.rest", function(res){
    res.on("data", function(data){
      kanyeSays = JSON.parse(data);
      response.render('rest' , {kanyeQuote : kanyeSays.quote})
    })
  });
});

app.listen(3000,function(){
  console.log("Server has started at port 3000 for kanye_rest.");
});
