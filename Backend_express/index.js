import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import trail_route from './routes/trail.route.js';
import post_route from './routes/post.route.js';
dotenv.config({ path: '../.env' });
const bart = express();
bart.use(express.json());
bart.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5000'],
    methods: ['POST', 'GET', 'PUT'],
    credentials: true,
  })
);
connectDB().then(() => {
  bart.listen(process.env.PORT, () => {
    console.log(`backend is listening on http://localhost:${process.env.PORT}`);
  });
});

bart.use('/trail', trail_route);
bart.use('/trail', post_route);
