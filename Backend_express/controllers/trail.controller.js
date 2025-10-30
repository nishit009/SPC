import  asynchandler from '../utils/asynchandler.js';

const trail_get = asynchandler(async (req, res) => {
  res.status(202).json({ preetham: 'good boy' });
});
export default trail_get;
