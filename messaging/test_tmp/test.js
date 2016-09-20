'use strict'
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('connected',function(){
  console.log('connected');
  var Schema=mongoose.Schema,
      ObjectId=Schema.ObjectId;
  
  var model=new Schema({
    item_id:ObjectId,
    name:String
  }); 
  
  var Item=mongoose.model('test',model);
  
  var save_item=new Item({name:'leikesi'});
  save_item.save(function(error){
    if(error) console.error(error);
    console.log('item saved');
  });  

});

mongoose.connection.on('error',function(error){
  console.log('error',error);
});
