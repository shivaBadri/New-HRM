import express from 'express';
import Attendance from '../models/Attendance.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, async (req,res)=>{
  const filter = req.user.role === 'employee' ? { employeeId:req.user.employeeId } : {};
  res.json(await Attendance.find(filter).sort({ createdAt:-1 }).limit(200));
});
router.post('/punch', protect, async (req,res)=>{
  const today = new Date().toISOString().slice(0,10);
  const now = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
  let record = await Attendance.findOne({ employeeId:req.user.employeeId, date: today });
  if(record && !record.punchOut){ record.punchOut = now; await record.save(); return res.json(record); }
  record = await Attendance.create({ employeeId:req.user.employeeId, employeeName:req.user.name, date:today, punchIn:now, mode:req.body.mode || 'Office', latitude:req.body.latitude, longitude:req.body.longitude, source:req.body.source || 'Web' });
  res.status(201).json(record);
});
export default router;
