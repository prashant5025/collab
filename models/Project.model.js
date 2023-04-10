const mongoose = require('mongoose');
// const Comment = require('../models/comment.model')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Please provide a comment"],
        trim: true,
    },
    project_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Please provide a project_id"],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Please provide a user_id"],

    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },
    entrepreneur_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Please provide an entrepreneur_id"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Please provide a location"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "Please provide a status"],
        trim: true,
    },
    investment_required: {
        type: Number,
    },
    investment_received: {
        type: Number,
    },
    expertise_required: {
        type: String,
        required: [true, "Please provide a expertise_required"],
        trim: true,
    },
    comments: [CommentSchema],
    start_date: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide a start_date"],
    },
    end_date: {
        type: Date,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },


    
},{timestamps:true});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;