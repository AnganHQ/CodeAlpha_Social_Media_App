const Comment = require("../models/Comment");

const createComment = async (
    req,
    res
) => {
    try {

        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Comment required"
            });
        }

        const comment =
            await Comment.create({

                post: req.params.postId,

                author: req.user._id,

                text
            });

        res.status(201).json(
            comment
        );

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getComments = async (
    req,
    res
) => {
    try {

        const comments =
            await Comment.find({
                post:
                req.params.postId
            })
            .populate(
                "author",
                "username profilePic"
            )
            .sort({
                createdAt: -1
            });

        res.status(200)
        .json(comments);

    } catch (error) {
        res.status(500).json({
            message:
            error.message
        });
    }
};

module.exports = {
    createComment,
    getComments
};