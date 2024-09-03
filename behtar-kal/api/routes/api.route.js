import express from 'express';
import Project from '../models/project.model.js';
import Donation from '../models/donation.model.js';

const router = express.Router();


// Projects CRUD
router.post('/projects', async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).send(project);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.put('/projects/:id', async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!project) {
        return res.status(404).send();
      }
      res.send(project);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.delete('/projects/:id', async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).send();
      }
      res.send(project);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Donations CRUD
  router.post('/donations', async (req, res) => {
    try {
      const donation = new Donation(req.body);
      await donation.save();
      res.status(201).send(donation);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.put('/donations/:id', async (req, res) => {
    try {
      const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!donation) {
        return res.status(404).send();
      }
      res.send(donation);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.delete('/donations/:id', async (req, res) => {
    try {
      const donation = await Donation.findByIdAndDelete(req.params.id);
      if (!donation) {
        return res.status(404).send();
      }
      res.send(donation);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

export default router;
