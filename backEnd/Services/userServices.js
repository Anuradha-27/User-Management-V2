const pool = require('../Models/userModel');
const bcrypt = require("bcrypt");

exports.getAllUsersService = async (page, limit) => {

  const off = (page - 1) * limit;
  const allUsers = await pool.query(`select * from user_management.users inner join  user_management.states on user_management.users.u_id=user_management.states.u_id where users.del='0' order by users.u_id limit ${limit} offset ${off}`)
  const totalRecords =
    await pool.query(`select count(del) from user_management.users where del='0';
  `); 
  
  return {
    data: allUsers.rows,
    totalRecords: totalRecords.rows[0].count,
    totalPages: Math.ceil(totalRecords.rows[0].count / limit),


  };

}
exports.addUserService = async (bodyData) => {
  const hash = bcrypt.hashSync(bodyData.password, 10);
  bodyData.password = hash;
  const client = await pool.connect()


  try {
    client.query("Begin");
    const results = await client.query("insert into user_management.users(f_name,m_name,l_name,dob,gender,email,password,apart_name,locality,landmark,pincode,city)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)returning u_id",
      [bodyData.f_name, bodyData.m_name, bodyData.l_name, bodyData.dob, bodyData.gender, bodyData.email, bodyData.password, bodyData.apart_name, bodyData.locality, bodyData.landmark, bodyData.pincode, bodyData.city])
    await client.query("insert into user_management.states(state_name,u_id)values($1,$2)", [bodyData.state_name, results.rows[0].u_id])
    client.query("commit");
    return results;

  } catch (error) {
    console.log(error);
    client.query("rollback");
  } finally {
    client.release();
  }
}

exports.displayByEmailService = async (email) => {
  const client = await pool.connect()
  const getEmail = await client.query(`select * from user_management.users where email like '%${email}%'`);
  return getEmail.rows;
}
exports.deleteUserService = async (id) => {
  const client = await pool.connect();
  try {

    const results = await client.query(`update users set del='1' where u_id=$1`, [id]);
    console.log(results);
    return results;

  }
  catch (error) {
    console.log(error);

  } finally {
    client.release();
  }
}



exports.updateUserService = async (body, id) => {
  const client = await pool.connect();
  try {
    client.query('Begin');
    const result = client.query(`update user_management.users set f_name=$1,m_name=$2,l_name=$3,dob=$4,gender=$5,email=$6,password=$7,apart_name=$8,locality=$9,landmark=$10,pincode=$11,city=$12 where u_id=$13 `, [body.f_name, body.m_name, body.l_name, body.dob, body.gender, body.email, body.password, body.apart_name, body.locality, body.landmark, body.pincode, body.city, id]);
    client.query(`update user_management.states set state_name=$1 where u_id=$2`, [body.state_name, id])
    client.query('Commit')
    return result;

  }
  catch (error) {
    console.log(error);
    client.query("rollback");
  } finally {
    client.release();
  }
}