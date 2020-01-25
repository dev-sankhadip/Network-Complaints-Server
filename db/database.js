const mysql=require('mysql');
require('dotenv').config()

const connection=mysql.createPool({
    host:'localhost',
    database:'telecom',
    user:'root',
    password:'root'
})

module.exports={
    connection
}