const sequelize = require('../connections/mysql.connection').sequelize;
const { DataTypes } = require('sequelize');


const Comment = sequelize.define("comments", {
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    parentCommentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Comment;
