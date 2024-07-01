const { Op } = require('sequelize');
const Comment = require('../models/Comment');
const User = require('../models/User');
const moment = require('moment');


module.exports = class CommentController {

    static async showComments(req, res) {
        let search = '';

        if(req.query.search) {
            search = req.query.search;
        }

        const commentData = await Comment.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` },
            }
        })
        const comments = commentData.map((result) => result.get({ plain: true }));

        const commentReverse = comments.reverse();

        console.log(commentReverse)
        let commentsQty = comments.length;

        if(commentsQty === 0) {
            commentsQty = false;
        }

        // format date
        const dateFormatedComments = commentReverse.map((comment) => {
            const formatteDate = moment(comment.createdAt).format('MM/DD/YYYY');
            return {
                ...comment,
                formatteDate
            };
        });

        res.render('comments/home', { comments: dateFormatedComments, search, commentsQty });
    }

    static async dashboard(req,res) {

        const userId = req.session.userid;

        const user = await User.findOne({
            where: { id: userId },
            include: Comment,
            plain: true
        });

        // check if user exists
        if(!user) {
            res.redirect('/login');
        }

        const comments = user.Comments.map((result) => result.dataValues);

        let emptyComments = false;

        if(comments.length === 0) {
            emptyComments = true;
        }

        res.render('comments/dashboard', { comments, emptyComments });
    }

    static async createComment(req, res) {
        res.render('comments/create');
    }
    static async createCommentSave(req, res) {

        const commentUser = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Comment.create(commentUser);

            req.flash('message', 'Comentário criado com sucesso!');

            req.session.save(() => {
                res.redirect('/comments/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateComment(req, res) {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id,
            },
            raw: true
        });

        res.render('comments/edit', { comment });
    }
    static async updateCommentSave(req, res) {
        const comment = {
            id: req.body.id,
            title: req.body.title
        }

        try {
            await Comment.update(comment, { where: { id: comment.id }});
            req.flash('message', 'Comentario atualizado com sucesso!');

            req.session.save(() => {
                res.redirect('/comments/dashboard');
            });
        } catch (error) {
            console.log('Aconteceu um erro: ', error);
        }
    }

    static async removeComment(req, res) {
        const id = req.body.id;
        const userId = req.session.userid;

        try {
            await Comment.destroy({
                where: {
                    id: id,
                    UserId: userId
                }
            });
            req.flash('message', 'Comentario removido com sucesso!');

            req.session.save(() => {
                res.redirect('/comments/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }

}
