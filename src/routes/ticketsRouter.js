import express from 'express';
const router = express.Router();
import { allTicketsList, ticketsList, createTicket } from '../controllers/ticketsController.js';
import verifyToken from '../middlewares/verifyToken.js';
import createTicketValidator from '../validations/createTicketValidator.js';

router.get('/listas', allTicketsList)
router.get('/', verifyToken, ticketsList)
router.post('/crear', verifyToken, createTicketValidator, createTicket)

export default router ;