const User=require('../model/User');
const Division=require('../model/Division');

const getAllUser=async(req, res, next)=>{
    try {
      //success sementara
    const users = await User.findAll({
      include: [Division]
    });

    const usersFix = users.map((User) => ({
      id:User.id,
      fullName:User.fullName,
      angkatan:User.angkatan,
      divisionId:User.divisionId,
      division:User.division.name
    }));

    //mengirimkan status
    res.status(200).json({
      status: "Success",
      message: "Succesfully fetch all user data",
      user: usersFix
    })
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: "Internal Server Error",
        error: error.message
      });
    }
  }

  const getUserById = async (req, res, next) => {
    try {
      //success sementara
      const { userId } = req.params;
      const user = await User.findOne({
        where: { id: userId },
        include: [Division]
      });

      //jika tidak ditemukan
      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: `User with id ${userId} does not exist!`,
        });
      }

      const userFix ={
        id:user.id,
        fullName:user.fullName,
        angkatan:user.angkatan,
        divisionId:user.divisionId,
        division:user.division.name
      }

      //jika ditemukan
      res.status(200).json({
        status: "Success",
        message: "Successfully fetch user data",
        user: userFix,
      });
    } catch (error) {
      console.log(error.message)
    }
  };

  const postUser = async (req, res, next) => {
    try {
      const {
        fullName, nim, angkatan, email, password, division
      } = req.body
  
      //cari divisi id
      //pakai await untuk menghindari penulisan then
      const user_division = await Division.findOne({
        where:{
          name: division
        }
      });
  
      //SELECT * FROM DIVISION WHERE name = division
      if(user_division == undefined){
        const error=new Error(`Division ${division} is not existed`)
        error.statusCode=400;
        throw error
      }
  
      //insert data ke tabel User
      const currentUser = await User.create({
        //nama field: data
        fullName: fullName,
        //jika nama field == data maka bisa diringkas
        email,
        password,
        angkatan,
        nim,
        divisionId: user_division.id
      })
  
      //send response
      res.status(201).json({
        status: "success",
        message: "Successfuly Create User",
        user: {
          fullName: currentUser.fullName,
          division: division
        }
      })
    } catch (error) {
      //jika status code belum terdefined maka status=500
      res.status(error.statusCode||500).json({
        status:"Error",
        message:error.message
      })
    }
  };
  

const deleteUser=(req,res,next)=>{
    try {
      const {userId} = req.params;
  
      //mencari index user dari array model user
      const targetedIndex = User.findIndex((element)=>{
        return element.id == userId
      })
  
      //user tidak ketemu
      if(targetedIndex === -1){
        res.status(400).json({
          status: "Error",
          message: `User with id ${userId} is not existed`
        })
      }
  
      //hapus array pada [targetedIndex] sebanyak 1 buah element
      User.splice(targetedIndex, 1);
  
      res.status(200).json({
        status: "Success",
        message: "Successfully delete user"
      })
    } catch (error) {
      console.log(error.message);
    }
  }

const errorFound=(req,res,next) => {
  res.status(404).json({
     status: "Error",
     message: "Not Found"
    });
}

const errorServer=(req,res,next) => {
  res.status(500).json({
    status: "Error",
    message: "Internal Server Error"
  });
}

module.exports={getAllUser,getUserById,postUser,deleteUser,errorFound,errorServer}