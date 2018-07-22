
'use strict'

var config = require('../config/config.js'); 
var mysql = require('MySQL');
var db = mysql.createConnection(config.darleneJdb);



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

const get   =  (email, password, fn) => {
    var sql = "select id,name, email ,role from tb_user where email=? and password=? ;";
   db.query(sql, [email,password],fn);
};


User.prototype.save = function(name,email,password,fn){
    var sql = "insert into tb_user(name,email,password) values(?,?,?)";
    db.query(sql,[name,email,password],fn );
};

User.prototype.getAll = function(fn){
    var sql = 'select name, email, role from tb_user;';
    db.query(sql,[],fn );
};
User.prototype.deleteAll = function(fn)
{
    var sql = 'delete from tb_user';
    db.query(sql ,[],fn);
};

module.exports = User;