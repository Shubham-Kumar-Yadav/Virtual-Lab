const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const bodyParser = require("body-parser");
const router = express.Router();



//JSON PARSING
app.use(bodyParser.json());
  
//UrlEncoded Data Parsing
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');


router.use(express.static(path.join(__dirname, 'vendor')));
router.use(express.static(path.join(__dirname,'master')));
router.use(express.static(path.join(__dirname,'js')));
router.use(express.static(path.join(__dirname,'css')));
router.use(express.static(path.join(__dirname,'img')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'),{message:"Hello there"});
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about-us.html'));
});

router.get('/ballmill',function(req,res){
    res.sendFile(path.join(__dirname+'/ball_mill.html'));
  });

router.get('/contact',function(req,res){
  res.sendFile(path.join(__dirname+'/contact.html'));
});

router.get('/ballmillobservation',function(req,res){
  var temp = JSON.parse(JSON.stringify(req.query));
  let M = 0;
    for (let i = 0; i < 5; i++) {

        M = M + Number(temp.MR[i]);
    }
    temp.totalmass = M;

    let RAV;
    for (let i = 0; i < 5; i++) {

        RAV = 1/Number(temp.AV[i]);
        RAV = RAV.toString();
        if (i == 0) {
            temp.RAVP = RAV
        }
        else {
            temp.RAVP = temp.RAVP + ", " + RAV
        }
    }
    temp.RAVP = temp.RAVP.split(',')

    let MF;
    for (let i = 0; i < 5; i++) {

        MF = Number(temp.MR[i]) / M;
        MF = MF.toString();
        if (i == 0) {
            temp.MFF = MF
        }
        else {
            temp.MFF = temp.MFF + ", " + MF
        }
    }
    temp.MFF = temp.MFF.split(',')

    let CMF = 0;
    for (let i = 0; i < 5; i++) {
        CMF = Number(CMF) + Number(temp.MFF[i]);
        CMF = CMF.toString();
        if (i == 0) {
            temp.CMFF = CMF
        }
        else {
            temp.CMFF = temp.CMFF + ", " + CMF
        }
    }
    temp.CMFF = temp.CMFF.split(',')

    var value = JSON.stringify(temp);
  res.render("ballmillobservation.pug", {
    "datas": temp
});
fs.writeFileSync('./views/store.json', value);

});

router.get('/settling',function(req,res){
  res.sendFile(path.join(__dirname+'/settling.html'));
});

router.get('/settlingobservation',function(req,res){
  var temp = JSON.parse(JSON.stringify(req.query));
  let SVA;
  for(let i=0; i<5; i++){
    SVA=Number(temp.INHA[i])/Number(temp.TimeA[i])
    console.log(SVA)
    SVA=SVA.toString();
    if (i == 0) {
      temp.SEVA = SVA
    }
    else {
      temp.SEVA = temp.SEVA + ", " + SVA
    }
  }
  temp.SEVA = temp.SEVA.split(',')

  let SVB;
  for(let i=0; i<5; i++){
    SVB=Number(temp.INHB[i])/Number(temp.TimeB[i])
    SVB=SVB.toString();
    if (i == 0) {
      temp.SEVB = SVB
    }
    else {
      temp.SEVB = temp.SEVB + ", " + SVB
    }
  }
  temp.SEVB = temp.SEVB.split(',')  
  var value = JSON.stringify(temp);
  res.render("settlingobservation.pug", {
    "datas": temp
});
fs.writeFileSync('./views/store.json', value);

});

router.get('/rotap',function(req,res){
  res.sendFile(path.join(__dirname+'/rotap.html'));
});

router.get('/rotapobservation',function(req,res){
  var temp = JSON.parse(JSON.stringify(req.query));
  let M = 0;
    for (let i = 0; i < 5; i++) {

        M = M + Number(temp.MR[i]);
    }
    temp.totalmass = M;

    let RAV;
    for (let i = 0; i < 5; i++) {

        RAV = 1/Number(temp.AV[i]);
        RAV = RAV.toString();
        if (i == 0) {
            temp.RAVP = RAV
        }
        else {
            temp.RAVP = temp.RAVP + ", " + RAV
        }
    }
    temp.RAVP = temp.RAVP.split(',')

    let MF;
    for (let i = 0; i < 5; i++) {

        MF = Number(temp.MR[i]) / M;
        MF = MF.toString();
        if (i == 0) {
            temp.MFF = MF
        }
        else {
            temp.MFF = temp.MFF + ", " + MF
        }
    }
    temp.MFF = temp.MFF.split(',')

    let CMF = 0;
    for (let i = 0; i < 5; i++) {
        CMF = Number(CMF) + Number(temp.MFF[i]);
        CMF = CMF.toString();
        if (i == 0) {
            temp.CMFF = CMF
        }
        else {
            temp.CMFF = temp.CMFF + ", " + CMF
        }
    }
    temp.CMFF = temp.CMFF.split(',')

    var value = JSON.stringify(temp);
  res.render("rotapobservation.pug", {
    "datas": temp
});
fs.writeFileSync('./views/store.json', value);

});


router.get("/store", (req,res)=>{
  fs.readFile('./views/store.json','utf8', function(err, jsondata){ 
      if (err) {
          throw err;
        }
  res.send(JSON.parse(jsondata));
      
  }); 
});
//add the router


app.use('/', router);
app.listen(process.env.port || 4000);

console.log('Running at Port 4000');