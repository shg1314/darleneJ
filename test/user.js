'use strict'

var config = require('../config/config.js'); 
var mysql = require('MySQL');
var db = mysql.createConnection(config.darleneJdb);
var User =  require('../models/user.js');
var user = new User();

var assert = require('assert');

describe('save',function(){
    before('delete all user',function(){
        user.deleteAll(function(err,result){
            if(err) throw err;
        });
    });

    it('should save new user', function(){
        var newuser = {name : 'test', email : 'test@test.com', password:'test'};
        user.save(newuser.name,newuser.email,newuser.password,function(err,result){
            if(err) throw err;
            assert(1==result.result.affectedRows);
            user.getUserEmailAndPass(newuser.email,newuser.password,function(err,rows){
                assert(rows.length==1);
                assert(rows[0].name == newuser.name);
                assert(rows[0].email == newuser.email);
            });
        });
    });
}
);