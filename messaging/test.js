   
   function Obj(n){
      this.name=n;
      console.log('init');
   }


   Obj.prototype.fun=function(){
      return this.name;
   }
  
module.exports=Obj;
