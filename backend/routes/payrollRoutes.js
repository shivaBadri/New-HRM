import express from 'express';
import Payroll from '../models/Payroll.js';
import { protect, allowRoles } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, async (req,res)=>{
  const filter = req.user.role === 'employee' ? { employeeId:req.user.employeeId } : {};
  res.json(await Payroll.find(filter).sort({ createdAt:-1 }));
});
router.post('/', protect, allowRoles('admin','hr'), async (req,res)=> res.status(201).json(await Payroll.create(req.body)));
export default router;
