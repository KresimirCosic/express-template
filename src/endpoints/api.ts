import express from 'express';

import { login } from './login';
import { register } from './register';

export const api = express.Router();

api.use('/login', login);
api.use('/register', register);
