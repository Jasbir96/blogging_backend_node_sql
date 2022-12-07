const articleModel = require("../models/articleModel");
const commentModel = require("../models/commentModel");

const createArticleController = async (req, res) => {
    // all the required data is present
    try {
        const { title, body, sub_title, tags } = req.body;
        if (title == undefined || body == undefined || tags == undefined || sub_title == undefined) {
            return res.status(400).json({
                status: "failure",
                message: "some required fileds are missing"
            })
        }
        // send the request to model 
        await articleModel.create({
            title,
            body,
            sub_title,
            tags,
            author_id: req.userId
        })
        // res with success
        res.status(201).json({
            status: "success",
            message: "article created successfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }

}
const getArticleBySlugController = async (req, res) => {
    try {
        const articleSlug = req.params["article_slug"];
        const article = await articleModel.getByEntity({ slug: articleSlug });
        if (article == null) {
            res.status(404).json({
                status: "failure",
                message: "article not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                message: article,

            })
        }

    } catch (err) {
        return res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const getAllController = async (req, res) => {
    try {
        // i need get data from the query params
        const query = req.query;
        // feed that to model 
        const result = await articleModel.getAll(query);
        // return the response 
        res.status(200).json({
            status: "success",
            message: result
        })
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const updateArticleController = async (req, res) => {
    try {
        // we need update 
        let updateObj = req.body;
        let articleSlug = req.params["article_slug"];
        if (Object.keys(updateObj).length == 0 || updateObj.title != undefined) {
            return res.status(400).json({
                status: "failure",
                data: "invalid request"
            })
        }
        await articleModel.updateBySlug(articleSlug, updateObj);
        // return the response 
        res.status(200).json({
            status: "success",
            data: "article successfully updated"
        })
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

const feedController = async (req, res) => {
    try {
        const size = req.query.size||10;
        const page = req.query.page||1;;
        const userId = req.userId;
        const articles = await articleModel.feed(size, page, userId);
        if (articles.length == 0) {
            res.status(404).json({
                status: "failure",
                data: "articles not found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            data: articles
        })


    } catch (err) {
        return res.status(500).json({
            status: "failure",
            message: err.message
        })
    }


}

// *************likes**************
const likeArticleController = async (req, res) => {
    try {
        let userId = req.userId;
        // the user i want to follow;
        let articleSlug = req.params["article_slug"];
        await articleModel.like(userId, articleSlug);
        res.status(201).json({
            status: "success",
            result: "you are have now liked the post"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
const dislikeArticleController = async (req, res) => {
    try {
        let userId = req.userId;
        let articleSlug = req.params["article_slug"];

        await articleModel.unlike(userId, articleSlug);
        res.status(200).json({
            status: "success",
            result: "you are have now disliked the post"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}



// ********comments *********
const createCommentController = async (req, res) => {
    try {

        if (req.body.content == undefined || req.body.content == "") {
            return res.status(400).json({
                status: "failure",
                message: "content can not be empty"
            })
        }
        const content = req.body.content;
        const userId = req.userId;
        const articleSlug = req.params["article_slug"];
        await commentModel.create(articleSlug, userId, content);
        res.status(200).json({
            status: "success",
            result: "comment created successfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
const deleteCommentController = async (req, res) => {
    try {
        let commentId = req.params["comment_id"];
        await commentModel.deleteCommentOfArticle(commentId);
        res.status(200).json({
            status: "success",
            data: "comment deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
const commentsOfArticleController = async (req, res) => {
    try {
        const articlSlug = req.params["article_slug"];
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        const comments = await commentModel.getAllCommentOfAnArticle(articlSlug, page, size);
        if (comments.length == 0) {
            return res.status(404).json({
                status: "failure",
                data: "no comment found"
            })
        }
        res.status(200).json({
            status: "success",
            message: comments
        })


    } catch (err) {
        res.status(500).json({
            status: "failure",
            err: err.message
        })
    }
}
module.exports = {
    createArticleController,
    getArticleBySlugController,
    getAllController,
    updateArticleController,
    likeArticleController,
    dislikeArticleController,
    createCommentController,
    deleteCommentController,
    commentsOfArticleController,
    feedController
};