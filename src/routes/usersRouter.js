import express from 'express';
const router = express.Router();
import { userList, createUser, loginUser, userNameCheck, sessionCheck, logout } from '../controllers/usersController.js'
import registerUserValidator from '../validations/registerUserValidator.js'
import loginUserValidator from '../validations/loginUserValidator.js'

router.get('/', userList)
router.get('/verify-name/:userName', userNameCheck)
router.post('/register', registerUserValidator, createUser)
router.post('/login', loginUserValidator, loginUser)
router.post('/session-check', sessionCheck)
router.post('/logout', logout)


export default router ;