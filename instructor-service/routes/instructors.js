const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

/**
 * @swagger
 * components:
 *   schemas:
 *     Instructor:
 *       type: object
 *       required:
 *         - instructorId
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         instructorId:
 *           type: string
 *           example: INS001
 *         firstName:
 *           type: string
 *           example: Jane
 *         lastName:
 *           type: string
 *           example: Smith
 *         email:
 *           type: string
 *           example: jane.smith@university.lk
 *         phone:
 *           type: string
 *           example: "+94771234567"
 *         specialization:
 *           type: string
 *           example: Computer Science
 *         departmentId:
 *           type: string
 *           example: DEPT001
 *         qualification:
 *           type: string
 *           example: PhD in Computer Science
 *         status:
 *           type: string
 *           enum: [Active, Inactive, OnLeave]
 *           example: Active
 */

/**
 * @swagger
 * /instructors:
 *   get:
 *     summary: Get all instructors
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: List of all instructors
 */
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json({ success: true, count: instructors.length, data: instructors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /instructors/{id}:
 *   get:
 *     summary: Get an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor found
 *       404:
 *         description: Instructor not found
 */
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ success: false, message: 'Instructor not found' });
    res.status(200).json({ success: true, data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /instructors:
 *   post:
 *     summary: Create a new instructor
 *     tags: [Instructors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instructor'
 *     responses:
 *       201:
 *         description: Instructor created successfully
 */
router.post('/', async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    const saved = await instructor.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Instructor ID or Email already exists' });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /instructors/{id}:
 *   put:
 *     summary: Update an instructor by ID
 *     tags: [Instructors]
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
 *             $ref: '#/components/schemas/Instructor'
 *     responses:
 *       200:
 *         description: Instructor updated successfully
 */
router.put('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!instructor) return res.status(404).json({ success: false, message: 'Instructor not found' });
    res.status(200).json({ success: true, data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @swagger
 * /instructors/{id}:
 *   delete:
 *     summary: Delete an instructor by ID
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor deleted successfully
 */
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) return res.status(404).json({ success: false, message: 'Instructor not found' });
    res.status(200).json({ success: true, message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
