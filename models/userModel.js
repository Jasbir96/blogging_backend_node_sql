const connection=require("../connection");
const { v4: uuidv4 } = require('uuid');
const create=async (userObj)=>{
// 1. data transformation
// a.) generate id  

//b .) generate password hash
//c.) remove password confirm Password,password -> after we have created hash
// 2. make a db query



}

module.exports.create=create;

