const express = require('express');
const router = express.Router();


const {createProject,updateProject,getProject,getProjects} = require('../controllers/Project/project.controller');




router.post('/',createProject);
router.put('/:id',updateProject);
router.get('/:id',getProject);
router.get('/',getProjects);

module.exports = router;