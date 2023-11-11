const Sequalize=require("sequelize")
const my_db=require('../util/connect_db')

const User=my_db.define("users",{
  id:{
    type:Sequalize.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
  fullName:{
    type:Sequalize.STRING,
    allowNull:false
  },
  nim:{
    type:Sequalize.STRING,
    allowNull:false
  },
  angkatan:{
    type:Sequalize.INTEGER,
    allowNull:false
  },
  profilePicture:{
    type:Sequalize.TEXT,
    allowNull:true
  },
  email:{
    type:Sequalize.STRING,
    allowNull:false
  },
  password:{
    type:Sequalize.STRING,
    allowNull:false
  }
})

module.exports = User