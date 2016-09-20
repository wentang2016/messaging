'use strict';
var conObj=require('../connection'),
    mongoose=conObj.mongoose,
    Schema=conObj.Schema;
    
    //user model schema
    
    var userSchema=new Schema({
    	name:String,
    	password:String,
    	status:{type:Number,min:0, max:5}
    	
    });
    
    var User=mongoose.model('user',userSchema);
    
    module.exports=User;