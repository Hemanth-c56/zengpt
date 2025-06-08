import express from 'express'
import {GetHistoryById, UpdateHistoryById, login, signup, deleteUser, GetUserDetails} from "../controllers/userController.js"
import {check} from "express-validator"

const router = express.Router();

router.post('/zengpt/signup',[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min : 6})
] , signup);

router.post('/zengpt/login',
    [
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min : 6})
    ]
    ,login);

router.delete('/zengpt/delete/account/:id', deleteUser);

router.get('/zengpt/:id', GetHistoryById);

router.get('/zengpt/user/details/:id', GetUserDetails);

router.put('/zengpt/:id', UpdateHistoryById)

// router.put('/zengpt/delete/history/:id', deleteHistoryById)

export default router
