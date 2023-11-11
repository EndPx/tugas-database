const express = require('express');
const router = express.Router();

//import model users dari folder model
const User = require('../model/User');
const{getAllUser,getUserById,postUser,deleteUser,errorFound,errorServer}=require('../controller/user')




//GET /users (ENDPOINT 1)
router.get("/users",getAllUser)

//GET /users/:userId -> GET /users/1
router.get("/users/:userId",getUserById)

//POST /users
router.post("/users",postUser)

//PUT /users

//DELETE /users/:userId
router.delete("/users/:userId",deleteUser)

//ERROR 404
router.use(errorFound);
  
// ERROR 500
router.use(errorServer);

module.exports = router;