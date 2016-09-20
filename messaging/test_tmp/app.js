'use strict'
require('express-mongoose');

var express=require('express'),
    app=express(),
    mongoose=require('mongoose'),
    models=require('./models');

mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname+'/test'));


app.get('/',function(req,res){
  res.send('hello world '+Date.now());

});

app.use('/',function(req,res,next){
  console.log(Date.now());
  next();
});

var Item=models.Item;
app.get('/init',function(req,res){
  new Item({name:'leikesi',age:12}).save();
  res.send('data inited');
});

app.get('/items',function(req,res){
  res.send(Item.find());
});

app.listen(3000);


