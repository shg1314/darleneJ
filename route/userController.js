'use strict'

var express = require('express');
var router = express.Router();

var config = require('../config/config.js'); 
var mysql = require('MySQL');
var db = mysql.createConnection(config.darleneJdb);
var user = new User();


//router.get('/login',function(req,res,next){
 //   res.render('login', {title : 'login page', message : req.flash('loginMessage')});
 // }
  //);

  router.post('/login',function(req,res,next){

    user.login(req.body.email,req.body.password,function(err,result){
        if(err) throw err;

        res.render('/', {user: result});
    });
    res.render('/', {title : '', message : req.flash('loginMessage')});
  }
  );

function User()
{
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
};

User.prototype.getUserEmailAndPass = function(email, password, fn ){
    var sql = "select id,name, email ,role from tb_user where email=? and password=? ;";
   db.query(sql, [email,password],fn);
};

User.prototype.save = function(name,email,password,fn){
    var sql = "insert into tb_user(name,email,password) values(?,?,?)";
    db.query(sql,[name,email,password],fn );
};

router.get('/login', function(req,res,next){
    user.login(req.body.email,req.body.password,function(err,result){
        if(err) throw err;

        res.render('/', {user: result});
    });
});

router.post('/login' ,function(req,res,next){
    user.save(req.body.name,req.body.email,req.body.password,function(err,result){
        if(err) throw err;
    });
});

module.exports = router;