'use strict';
var User=require('../beans/userBean.js');
    
    
    exports.getUserPromise=function(name,password){
    	var promise=User.findOne({name:name,password:password}).exec();
    	return promise; 
    };
    
    exports.getAvailableStatusPromise=function(name_arr){
    	var promise=User.find({name:{$in:name_arr}},{name:1,status:1}).exec();
    	return promise;
    };

