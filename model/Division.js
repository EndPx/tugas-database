const Sequalize=require("sequelize")
const my_db=require("../util/connect_db")

const Division=my_db.define("divisions",{
    id:{
        type:Sequalize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequalize.ENUM("Web Dev", "Mobile Dev", "PM","UI/IX","INKADIV"),
        allowNull:false
    }
})

module.exports=Division