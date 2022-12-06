const connection =require("../connection");
const {v4: uuidv4} =require("uuid");


const create = (articleSlug, userId, content)=>{
const id=uuidv4();
    return new Promise(function (resolve, reject) {
        connection.query(`INSERT INTO comments SET id="${id}",
         article_slug="${articleSlug}", 
         author_id="${userId}", 
         content="${content}"`,
            function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
    })
}
module.exports={
    create
}