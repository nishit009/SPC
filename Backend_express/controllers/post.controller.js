import asynchandler from '../utils/asynchandler.js';

const post_controller = asynchandler(async (req, res) => {
  const item = req.body;
  console.log(item);
  res.status(202).json({ message: 'Received' });
});
export default post_controller;
