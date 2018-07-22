'use strict'

var express = require('express');
var router = express.Router();

var config = require('../config/config.js'); 
var mysql = require('MySQL');
var db = mysql.createConnection(config.darleneJdb);
var User =  require('../models/user.js');
var user = new User();

//router.get('/login',function(req,res,next){
 //   res.render('login', {title : 'login page', message : req.flash('loginMessage')});
 // }
  //);

  //router.post('/login',function(req,res,next){

    //user.login(req.body.email,req.body.password,function(err,result){
      //  if(err) throw err;

        //res.render('/', {user: result});
    //});
    //res.render('/', {title : '', message : req.flash('loginMessage')});
 // }
  //);

router.get('/', function(req,res,next){
   // user.getUserEmailAndPass(req.body.email,req.body.password,function(err,result){
        //if(err) throw err;

       // res.render('/', {user: result});
    //});
    if(req.session.email != '')
        res.render('login', {title : 'login', message : 'message'});
    else res.redirect('',{title : '메인', message: '이미 로그인 했음'});
});

router.post('/' ,function(req,res,next){
    user.save(req.body.name,req.body.email,req.body.password,function(err,result){
        if(err) throw err;
        req.session.email = req.body.email;
        res.render('',{title : '메인', message: '이미 로그인 했음',email : req.body.email});
    });
});

module.exports = router;