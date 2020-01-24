import express from 'express'
const router = express.Router();
import userService from '../services/user.service';
import authorize from '../_helpers/authorize'
import Role from '../_helpers/role'
import commentService from '../services/comment.service'
// routes
router.post('/addComment', authorize(Role.User), addComment); // admin only
router.post('/:id/editComment', authorize(Role.User), editComment); // admin only
router.post('/:id/getCommentById', getCommentById); // admin only

async function addComment(req,res,next) {
    const result = await commentService.addCommnet(req)
    .catch(err => res.status(400).send({message: 'Něco se nezdařilo'}))
    res.send({message:result})
    
}

async function editComment(req,res,next) {
    const result = await commentService.editComment(req)
    .catch(err => res.status(400).send({message: 'Něco se nezdařilo'}))
    res.send({message:result})
}
async function getCommentById(req,res) {
    const id = parseInt(req.params.id)
    const result = await commentService.getCommentById(id)
    .then((comment) => res.send(comment))
    .catch(err => res.status(400).send({message: 'Něco se nezdařilo'}))
}
export default router;