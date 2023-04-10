const {StatusCodes} =require('http-status-codes');
const Project = require('../../models/Project.model');
const {validationResult} = require('express-validator');
const {UnprocessableEntityError} = require('../../errors');

// project url: http://localhost:8080/api/v1/${username}/project

// Project model

// - ### Projects

//     - id: string
//     - name: string
//     - entrepreneur_id: string (foreign key to Entrepreneurs table)
//     - description: string
//     - industry: string
//     - location: string
//     - status: string (in progress, completed, cancelled)
//     - investment_required: number
//     - investment_received: number
//     - expertise_required: string
//     - start_date: Date
//     - end_date: Date

const createProject = async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new UnprocessableEntityError(errors.array());
    }
    const project = await Project.create(req.body);
    try{
        res.status(StatusCodes.CREATED).json({project});

    }catch(err){
        next(err);
    }
    
}

const updateProject = async (req, res, next) => {
    req.body.updatedBy = req.user.userId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new UnprocessableEntityError(errors.array());
    }
    const {name,
        entrepreneur_id,
        description,
        category,
        location,
        status,
        investment_required,
        investment_received,
        expertise_required,
        start_date,
        end_date,} = req.body;
    try{
        const project = await Project.findByIdAndUpdate(req.params.id, {
        name,
        entrepreneur_id,
        description,
        category,
        location,
        status,
        investment_required,
        investment_received,
        expertise_required,
        start_date,
        end_date,
        }, {new: true});
        res.status(StatusCodes.OK).json({project});
    }catch(err){
        next(err);
    }
}

const deleteProject = async (req, res, next) => {
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json(project);
    }catch(err){
        next(err);
    }
}

const getProject = async (req, res, next) => {
    try{
        const project = await Project.findById(req.params.id);
        res.status(StatusCodes.OK).json(project);
    }catch(err){
        next(err);
    }
}

const getProjects = async (req, res, next) => {
    try{
        const projects = await Project.find({});
        res.status(StatusCodes.OK).json(projects);
    }catch(err){
        next(err);
    }
}

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getProjects,
}