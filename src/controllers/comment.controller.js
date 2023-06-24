const { insertComment, fetchCommentByMovieId } = require('../services/comment.services');


const addComment = async (req, res) => {
    try {
        const movieId = req.params['id'];
        const newComment = {
            comment: req.body.comment,
            parentCommentId: req.body.parentId,
            movieId: movieId
        };

        const comment = await insertComment(newComment);
        return res.status(201).send(comment);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
};


const getComments = async (req, res) => {
    try {
        const movieId = req.params['id'];
        const comments = await fetchCommentByMovieId(movieId);

        if (comments.length === 0) {
            return res.status(404).send({
                message: 'No comments available'
            });
        }
        return res.status(200).send(comments);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
};


module.exports = { addComment, getComments };
