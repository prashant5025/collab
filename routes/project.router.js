const express = require('express');
const router = express.Router();


const {createProject,updateProject,getProject,getProjects} = require('../controllers/Project/project.controller');




router.post('/create',createProject);
router.put('/:userId/:projectId/update',updateProject);
router.get('/:userId/:projectId',getProject);
router.get('/:userId',getProjects);

module.exports = router;