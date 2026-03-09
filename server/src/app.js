#!/usr/bin/env node

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import userRouter from './routes/usersRouter.js';
import ticketRouter from './routes/ticketsRouter.js'

/* Para que la api pueda comunicarse con otra aplicacion
 (el front) */
 import cors from 'cors'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuracion de cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parcea a JSON los datos entrantes almacenandolos en req.body

// Rutas
//Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor ejecutandose')
});

// Rutas de usuarios
app.use('/api/user', userRouter);

// Rutas de tickets
app.use('/api/ticket', ticketRouter );

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});