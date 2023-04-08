const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    start_date: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide a start_date"],
    },
    end_date: {
        type: Date,
    },

    
},{timestamps:true});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;