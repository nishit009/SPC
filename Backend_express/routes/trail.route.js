import trail_get from '../controllers/trail.controller.js';
import { Router } from 'express';
const route = Router();

route.get('/gets', trail_get);

export default route;
