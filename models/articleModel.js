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
                const tagsTableQuery = "INSERT INTO article_tags (a_slug,name) VALUES ?";
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
const getAll = async (queryObj) => {
    // process our query and get required data from and remove 
    // pass -> page -> take page number -> 1
    const page = queryObj.page || 1;
    // pass-> size -> that size else i will be assuming -> 10;
    const size = queryObj.size || 10;
    const offset=(page-1)*size;
    //  tags -> two tables -> article , article_tag
    const tags = queryObj.tags == undefined ? [] : queryObj.tags.split(",");
    delete queryObj.tags;
    delete queryObj.page;
    delete queryObj.size;


const areTagsAvailable =tags.length>0;
let articleSlugs=[];
if(areTagsAvailable){
articleSlugs=await getSlugfromArticleTags(tags);
}
    if (areTagsAvailable && articleSlugs==[]){
        return [];
    }
    
//  if we need to filter from articles
    let toFilterContent = Object.keys(queryObj).length > 0;
    let searchString = "";
    if (toFilterContent) {
        searchString = whereClauseHelper(queryObj);
    }
// if we need to filter In slugs
    let tagsString = "";
    if (areTagsAvailable) {
        const articleSlugString = inClauseTransformHelper(articleSlugs, "a_slug");
        tagsString = `slug IN ${articleSlugString} `;
    }         
//  query String
    let queryString = "";
    if (toFilterContent == false && areTagsAvailable == false) {
        queryString = `SELECT * from articles LIMIT ${size} OFFSET ${offset}`;
    } else if (toFilterContent == true && areTagsAvailable == true) {
        queryString = `SELECT * from articles WHERE ${searchString} AND ${tagsString} LIMIT ${size} OFFSET ${offset}`;
    } else if (toFilterContent == false && areTagsAvailable == true) {
        queryString = `SELECT * from articles WHERE  ${tagsString} LIMIT ${size} OFFSET ${offset}`;
    } else {
        queryString = `SELECT * from articles WHERE ${searchString}  LIMIT ${size} OFFSET ${offset}`;
    }
// firing query 

return new Promise((resolve, reject)=>{
    connection.query(queryString, function (err, res) {
        if(err){
            reject(err);
        }else{
            resolve(res);
        }
    })
})
}
const inClauseTransformHelper = (arr, key) => {
    let arraySlugString = "(";
    for (let i = 0; i < arr.length; i++) {
        arraySlugString += '"' + arr[i][key] + '"' + ","
    }
    arraySlugString = arraySlugString.substring(0, arraySlugString.length - 1);
    arraySlugString += ")";
    return arraySlugString
}
const whereClauseHelper = (queryObj) => {
    for (let attr in queryObj) {
        searchString += `${attr} = "${queryObj[attr]}",`
    }
    searchString = searchString.substring(0, searchString.length - 1);
    return searchString;
}

const getSlugfromArticleTags =  (tags) => {
    return new Promise((resolve, reject)=>{
      connection.query(`SELECT a_slug from article_tags WHERE name IN (?)`,[tags],function(err,res){
          if (err) {
              reject(err);
          } else {
              resolve(res);

          }
      })  
    })
}

module.exports = {
    create, getByEntity
    , getAll
};

// SELECT * from articles 
    // WHERE author_id = "6a8f424b-6f67-44db-97f1-dc4f8d89e7a9"
    // AND slug IN("interesting-article", "my-nth-article", "my-seven-article")
    // LIMIT 10 OFFSET 0;