const jwt = require("jsonwebtoken");
const connection = require("../connection");
const protectRoute = (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken) {
            req.userId = decodedToken;
            console.log("token", decodedToken);
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"

        })
    }
}
const identifyIsSameUserMiddleware = async (req, res, next) => {
    try {
        // articleSlug -> author_id -> userId
        // userId
        const articleSlug = req.params["article_slug"];
        const userId = req.userId;
      const authorIdArr=  await getAuthorId(articleSlug);
      console.log(authorIdArr);
      if(authorIdArr.length==0){
        res.status(401).json({
            message: "unauthorized access",
            status: "failure"
        })
        return
      }

      if(authorIdArr[0]["author_id"]==userId){
        next();
      }else{
        res.status(401).json({
            message: "unauthorized access",
            status: "failure"
        })
      }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"

        })
    }
}

const getAuthorId = (slug) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT author_id FROM articles WHERE slug="${slug}"`, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res)
            }
        })

    })
}
module.exports.protectRoute = protectRoute;
module.exports.identifyIsSameUserMiddleware = identifyIsSameUserMiddleware;