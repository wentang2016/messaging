'use strict';
/*
var mongoose=require('mongoose'),
    Schema=mongoose.Schema,
    events=require('events'),
    emitter=new events.EventEmitter();
    
    //db connection
    mongoose.connect('mongodb://localhost/test');
    var db=mongoose.connection;
    db.on('error',function(){
    	console.error('db connection error');
    });
*/    

var conObj=require('./connection'),
    Schema=conObj.Schema,
    mongoose=conObj.mongoose;


    //model
    var bookSchema=new Schema({
    	title:String,
    	author:String,
    	des:String,
    	cover_name:String
    });
    
    var Book=mongoose.model('book',bookSchema);
    

    module.exports=function(){
    	  console.log('success');
       };
