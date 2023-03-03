const validator = require("validator");

const {
  getAllUsersService,
  addUserService,
  displayByEmailService,
  deleteUserService,
  updateUserService
}=require('../Services/userServices');


const validateFields=(user)=>{
  if(
    user.f_name===""||
    !validator.isAlpha(user.f_name) ||
    user.m_name===""||
    !validator.isAlpha(user.m_name) ||
    user.l_name===""||
    !validator.isAlpha(user.l_name) ||
    user.dob===""||
    user.gender===""||
    !validator.isAlpha(user.l_name) ||
    user.email===""||
    !validator.isEmail(user.email) ||
    user.password===""||
    user.apart_name===""||
    user.locality===""||
    user.landmark===""||
    !validator.isAlpha(user.city) ||

    user.pincode===""||
    !validator.isNumeric(user.pincode) ||
    user.state_name===""
  ){
    return true;
  }else{
    return false;
  }
}
exports.displayAllUsers = async (req, res) => {
try {
  const params = req.params;
  if (JSON.stringify(params) === "{}") {
    var page = req.query.page;
    var limit=req.query.limit
    var serviceResponse = await getAllUsersService(page,limit);
    res.status(200).send(serviceResponse);
    console.log(serviceResponse)
  } 
  
} catch (error) {
  console.log(error)
  res.status(500).json({ error: "Internal Server Error" });
}
  
};

exports.addUser=async(req,res)=>{
  try {
  const user=req.body;
  if(validateFields(user)){
    res.status(400).send("Please enter appropriate data");
  } else {
    const result =await addUserService(req.body);
    if (result) {
      res.send("data inserted....")
    } else {
      res.status(500).send("something is wrong")
    }
  }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
  // try{
  //   const user= req.body;
  //   const serviceResponse=await addUserService(user);
  //   res.status(200).send(serviceResponse);

  // }catch (error) {
  //   console.log(error);
  //   res.status(500).send("Internal Server Error");
  // }
}
exports.displayByEmail=async(req,res)=> {
  try{
console.log(req.params.email);
const displayEmail=  await displayByEmailService(req.params.email);
 if(displayEmail)
 res.status(200).send(displayEmail);
}catch (error) {
  console.log(error)
  res.status(500).json({ error: "Internal Server Error" });
}
  

}
exports.deleteUser=async(req,res)=> {
  try {
  console.log(req.params.id);  
  const serviceResponse= deleteUserService(req.params.id);
  if(serviceResponse)
  res.status(200).send({success:true,msg: 'User deleted successfully'})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }

}

exports.updateUser=async(req,res)=>{

 try {
  const serviceResponse=await updateUserService(req.body,req.params.id);
if(serviceResponse)
 res.status(200).send({success:true,msg: 'User updated successfully',serviceResponse});
 
}catch (error) {
  console.log(error)
  res.status(500).json({ error: "Internal Server Error" });

}
}