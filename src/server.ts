import express from 'express';
import { createNewUser, login, pong } from './handlers/user';
import { protect } from './modules/auth';
//import morgan from 'morgan'
import cors from 'cors';
import router from './router';

const app = express();

//app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test', createNewUser);

app.use('/ping', pong);

app.use('/api', protect, router);

// app.use('/user', protect, createNewUser);

app.post('/login', login);

export default app;
