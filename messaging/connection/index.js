'use strict';

var mongoose=require('mongoose'),
    Schema=mongoose.Schema;
    
    //db connection
    mongoose.connect('mongodb://localhost/test');
    var cn=mongoose.connection;
    cn.on('error',function(){
    	console.error('db connection error');
    });
    
    cn.on('open',function(){
    	console.log('db connection opened');
    });
    
   exports.mongoose=mongoose;
   exports.Schema=Schema;
   
