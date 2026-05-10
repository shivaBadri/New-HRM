import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();
const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() });
  if(!user || !(await user.matchPassword(password))) return res.status(401).json({ message:'Invalid email or password' });
  res.json({ token: signToken(user._id), user: { id:user._id, name:user.name, email:user.email, role:user.role, employeeId:user.employeeId, avatar:user.avatar }});
});
export default router;
