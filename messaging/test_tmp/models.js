'use strict'

var mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var Item=new Schema({name:String,age:Number});
exports.Item=mongoose.model('item',Item);

