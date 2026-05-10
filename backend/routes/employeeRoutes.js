import express from 'express';
import Employee from '../models/Employee.js';
import { protect, allowRoles } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, async (req,res)=>{
  const q = req.query.q ? { $or: [{name: new RegExp(req.query.q,'i')},{department: new RegExp(req.query.q,'i')},{designation: new RegExp(req.query.q,'i')}] } : {};
  res.json(await Employee.find(q).sort({ createdAt:-1 }));
});
router.get('/:employeeId', protect, async (req,res)=> res.json(await Employee.findOne({ employeeId:req.params.employeeId })));
router.post('/', protect, allowRoles('admin','hr'), async (req,res)=> res.status(201).json(await Employee.create(req.body)));
router.put('/:id', protect, allowRoles('admin','hr'), async (req,res)=> res.json(await Employee.findByIdAndUpdate(req.params.id, req.body, { new:true })));
router.delete('/:id', protect, allowRoles('admin'), async (req,res)=> { await Employee.findByIdAndDelete(req.params.id); res.json({ message:'Employee removed' }); });
export default router;
