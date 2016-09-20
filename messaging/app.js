'use strict';
var express = require('express'), 
    app = express(), 
    server = require('http').Server(app), 
    io = require('socket.io')(server),
    errorHandler=require('errorhandler'), 
    bodyParser=require('body-parser'),
    Book = require('./books.js'),
    routers=require('./routers'),
    session=require('express-session'),
    middleware=require('./middleware');

var hostDomain="http://192.168.1.104:3000";

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(session({secret:'keyboard cat',resave:true,saveUninitialized:true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(middleware.filter);

app.get('/',function(req,res,next){
    res.redirect('/index');
});

app.post('/login',routers.login);


app.get('/login',function(req,res){
	res.render('login',{error:''});
});

app.get('/index', function(req, res) {
	//Book.find(function(err,books){
	//	if(err) return console.err(err);
	//	res.render('index',{books:books});
	//});l
	console.log('session:',req.session.id);
	Book();
	res.render('index',{books:[]});

});


app.get('/hello', function(req, res) {
	res.render('hello');
});

app.use(errorHandler());

io.on('connection', function(socket) {
	//console.log('connected');
	socket.on('message', function(data) {
		//console.log(data);
		var all={};
		all.data=data;
		all.id=socket.id;
		io.sockets.emit('message', all);
	});
	
	socket.on('create_group',function(data){
		console.log('before rooms: ',socket.rooms);
		var groupId=socket.id+'_'+data.requestor+'_'+data.roomNum;
		socket.join(data.requestor);
		socket.join(groupId);
		socket.emit('put_id',groupId);
		console.log('after rooms: ',socket.rooms);
	});
	
	socket.on('add_friends',function(data){
		
	});
});

server.listen(3000);

