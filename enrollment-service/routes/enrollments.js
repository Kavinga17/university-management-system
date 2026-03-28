const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - enrollmentId
 *         - studentId
 *         - courseId
 *         - enrollmentDate
 *       properties:
 *         enrollmentId:
 *           type: string
 *           example: ENR001
 *         studentId:
 *           type: string
 *           example: STU001
 *         courseId:
 *           type: string
 *           example: CRS001
 *         enrollmentDate:
 *           type: string
 *           format: date
 *           example: 2024-01-15
 *         grade:
 *           type: string
 *           example: A
 *         status:
 *           type: string
 *           enum: [Active, Completed, Dropped, Failed]
 *           example: Active
 */

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of all enrollments
 */
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /enrollments/{id}:
 *   get:
 *     summary: Get an enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment found
 *       404:
 *         description: Enrollment not found
 */
router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: 'Enrollment not found' });
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 */
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    const saved = await enrollment.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Enrollment ID already exists' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /enrollments/{id}:
 *   put:
 *     summary: Update an enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 */
router.put('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!enrollment) return res.status(404).json({ success: false, message: 'Enrollment not found' });
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Delete an enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 */
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: 'Enrollment not found' });
    res.status(200).json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
