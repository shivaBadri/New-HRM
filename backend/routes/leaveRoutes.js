import express from 'express';
import Leave from '../models/Leave.js';
import { protect, allowRoles } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, async (req,res)=>{
  const filter = req.user.role === 'employee' ? { employeeId:req.user.employeeId } : {};
  res.json(await Leave.find(filter).sort({ createdAt:-1 }));
});
router.post('/', protect, async (req,res)=> res.status(201).json(await Leave.create({ ...req.body, employeeId:req.user.employeeId, employeeName:req.user.name })) );
router.patch('/:id/status', protect, allowRoles('admin','hr','manager'), async (req,res)=> res.json(await Leave.findByIdAndUpdate(req.params.id, { status:req.body.status, approver:req.user.name }, { new:true })) );
export default router;
