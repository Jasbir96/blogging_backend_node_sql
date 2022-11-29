const connection = require("../connection");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const create = async (userObj) => {
    // 1. data transformation
    // a.) generate id  
    userObj.id = uuidv4();
    //b .) generate password hash
    userObj["password_hash"] = await bcrypt.hash(userObj.password, 10);
    //c.) remove password confirm Password,password -> after we have created hash
    delete userObj.password;
    delete userObj.confirmPassword;
    // 2. make a db query
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users SET ?`, userObj, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })

    })




}

const getEntity = (obj) => {
    let searchString = "";
    for (let key in obj) {
        searchString += `${key}="${obj[key]}",`;
    }

    searchString = searchString.substring(0, searchString.length - 1);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE ${searchString}`, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res[0]);
            }
        })
    })
}
const getAll = (page, size) => {
    const offset = (page - 1) * size;
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users 
    LIMIT ${size} OFFSET ${offset}
    `, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }

        })
    })
}
const follow = (u_id, following_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO user_following SET u_id='${u_id}',following_id='${following_id}'`,
            function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            }
        )
    })
}
const unfollow = (u_id, following_id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM user_following WHERE u_id='${u_id}' AND following_id='${following_id}'`,
            function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve();
                }
            }
        )
    })
}


module.exports.create = create;
module.exports.getEntity = getEntity;
module.exports.getAll = getAll;
module.exports.follow = follow;
module.exports.unfollow = unfollow;

