require("dotenv").config();
const Sequalize=require('sequelize');

//import data dari .env
const DB_NAME=process.env.DB_NAME
const DB_USERNAME=process.env.DB_USERNAME
const DB_PASSWORD=process.env.DB_PASSWORD

//connect database
///Sequalize(name_db,username_db,password_db,{option})
const my_db=new Sequalize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    host:"localhost",
    dialect:"mysql"
})

module.exports=my_db;