const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        title: String,
        minlength: [3, "Project name must be at least 3 characters long"],
    },
    entrepreneur_id: {
        // string(foreign key to entrepreneur table)

        type: Schema.Types.ObjectId,
        ref: "Entrepreneur",
    },
    description: {
        type: String,
        minlength: [3, "Project description must be at least 3 characters long"],
    },
    category: {
        type: String,
        minlength: [3, "Project category must be at least 3 characters long"],
    },
    location: {
        type: String,
        minlength: [3, "Project location must be at least 3 characters long"],

    },
    status: {
        type: String,
        enum: ["in progress", "completed", "failed"],
        default: "in progress",
    },
    investment_required: {
        type: Number,
        min: [0, "Project investment required must be at least 0"],
    },
    investment_received: {
        type: Number,
        min: [0, "Project investment received must be at least 0"],
    },
    expertise_required: {
        type: String,
        minlength: [3, "Project expertise required must be at least 3 characters long"],
    },
    start_date: {
        type: Date,
        default: Date.now,

    },
    end_date: {
        type: Date,
        
    },

    
})

module.exports = mongoose.model("Project", projectSchema);