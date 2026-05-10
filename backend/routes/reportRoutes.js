import express from 'express';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import Payroll from '../models/Payroll.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/summary', protect, async (req,res)=>{
  const [employees, attendance, leaves, payroll] = await Promise.all([Employee.countDocuments(), Attendance.countDocuments(), Leave.countDocuments(), Payroll.countDocuments()]);
  const departments = await Employee.aggregate([{ $group:{ _id:'$department', count:{ $sum:1 } } }]);
  res.json({ employees, attendance, leaves, payroll, departments });
});
export default router;
