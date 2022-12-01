const slug = require("slug");
const { v4: uuidv4 } = require("uuid");
const connection = require("../connection");
const create = function (articleObj) {
    // modification
    articleObj.id = uuidv4();
    articleObj.slug = slug(articleObj.title);
    const tags = articleObj.tags;
    delete articleObj.tags;

    // create -> article 
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO articles SET ?", articleObj, function (err, res) {
            if (err) {
                reject(err);
            } else {
    // put tags -> article tags table 
                //    modify -> the tags -> put it inside our article tags table
                const entries = [];
                for (let i = 0; i < tags.length; i++) {
                    let tag = tags[i];
                    entries.push([articleObj.slug, tag]);
                }
    const tagsTableQuery= "INSERT INTO article_tags (a_slug,name) VALUES ?";
    connection.query(tagsTableQuery, [entries], function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
    })

            }
        })

    })


}
const getByEntity = (obj) => {
    let searchString = "";
    for (let key in obj) {
        searchString += `${key}="${obj[key]}",`;
    }
    searchString = searchString.substring(0, searchString.length - 1);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM articles WHERE ${searchString}`, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res[0]);
            }
        })
    })
}
module.exports = { create,getByEntity };