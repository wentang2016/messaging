'use strict';
var userRouter=require('./userRouter.js');

// params req,res
exports.login=userRouter.verify;