import express from 'express'
const router = express.Router();
import userService from '../services/user.service';
import authorize from '../_helpers/authorize'
import Role from '../_helpers/role'

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/all', authorize(Role.Admin), getAll); // admin only
router.get('/:id', authorize(), getById);
router.post('/signup', signup)  
router.post('/deleteUser',authorize(Role.Admin), deleteUser)  
router.post('/setUserRole',authorize(Role.Admin), setUserRole) 
router.post('/check', checkToken) 
router.post('/get/user/from/token', getUserFromToken)     // all authenticated users
export default router;

function getUserFromToken(req,res) {
    userService.getUserFromToken(req,res);
} 
function setUserRole(req,res){
    userService.setUserRole(req,res);
}
function deleteUser(req,res) {
    userService.deleteUser(req,res);
} 
function checkToken(req,res,next) {
    userService.checkValidToken(req,res)
}
function signup(req,res,next) {
    userService.signUp(req.body)
    .then(({message}) => {
        authenticate(req,res,next)
    } )
    .catch(err => res.status(400).json(err))
} 

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res) {
    userService.getAll(req,res)
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}