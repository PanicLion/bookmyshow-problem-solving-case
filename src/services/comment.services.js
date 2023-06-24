const Comment = require('../models/comment.model');
const Movie = require('../models/movie.model');


async function insertComment(comment) {
    try {
        return await Comment.create(comment);
    } catch (err) {
        console.log(err);
    }
}


async function fetchCommentByMovieId(id) {
    try {
        const comments = await Comment.findAll({
            include: [
                {
                    model: Movie,
                    attributes: [
                        'title'
                    ]
                }
            ],
            attributes: [
                'parentCommentId',
                'comment'
            ],
            where: {
                movieId: id
            }
        });
        return comments;
    } catch (err) {
        console.log(err);
    }
}


module.exports = { insertComment, fetchCommentByMovieId };
