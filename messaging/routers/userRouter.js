'use strict';
var User = require('../Dao/UserDao.js');

exports.verify = function(req, res) {

	var username = req.body.username;
	var password = req.body.password;

	if (username == '' || password == '') {
		res.render('login', {
			error : 'password or username is empty'
		});
		return;
	}

	var promise = User.getUserPromise(username, password);
	promise.then(function(user) {
		if (user != null) {
			req.session.login = true;
			res.redirect('/index');
			return;
		}

		res.render('login', {
			error : 'password or username is invalid'
		});
	}, function(err) {
		res.render('login', {
			error : 'error occur while getting User'
		});
		//res.send('error occur whiling verifying, in routers');
	});
};

exports.request_adding_friends=function(socket,groupId,requestor,name_arr){
	if (!name_arr instanceof Array) return;
	var promise = User.getAvailableStatusPromise(name_arr);
	promise.then(function(names_status) {
		socket.to(requestor).emit('friends_feedback',{name_arr:names_status});
		for(var i in names_status){
			var name=names_status[i].name;
			var status=names_status[i].status;
			if(status==null||name==null)continue;
			if(status<1)continue;
			name=name.replace(/^\s+|\s+$/,'');
			if(name=='')continue;
			if(name instanceof String&&status instanceof Number)
			socket.to(name).emit('request_join_group',{groupId:groupId,requestor:requestor,name_arr:names_status});
		}

	}, function(err) {
		console.err('Error occur for getUserStatus');
	});
};

exports.getUsersStatus = function(socket,name_arr) {
	if (!name_arr instanceof Array) {
		socket.emit('',{names_status:[]});
		return;
	}
	var promise = User.getUsersStatusPromise(name_arr);
	promise.then(function(names_status) {
		console.log(names_status);
		socket.emit();
	}, function(err) {
		console.err('Error occur for getUserStatus');
	});

};

/*
 function(req,res){

 var username=req.body.username;
 var password=req.body.password;

 if(username==''||password==''){
 res.json({success:0});
 return;
 }

 var promise=User.getUserPromise(username,password);
 promise.then(function(user){
 if(user!=null){
 req.session.login=true;
 res.json({success:1});
 }

 res.json({success:0});
 },function(err){
 res.json({success:0});
 //res.send('error occur whiling verifying, in routers');
 });
 };
 */