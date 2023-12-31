const Division = require('../model/Division');
const User = require('../model/User');
const my_db = require('./connect_db');

const divisi_itc=[
    {name:"Web Dev"},
    {name:"Mobile Dev"},
    {name:"PM"},
    {name:"INKADIV"},
    {name:"UI/IX"}
    
]
// One-to-Many: Division to User
Division.hasMany(User);
User.belongsTo(Division);

const association = async () => {
  try {
    await my_db.sync({ force: false });
    // await Division.bulkCreate(divisi_itc)
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = association;