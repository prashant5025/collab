const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",

    },
    text: {
        type: String,
        required: [true, "Please provide a comment"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const IdeaSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [50, "Title must be at most 50 characters long"],

    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,
        minlength: [3, "Description must be at least 3 characters long"],
        maxlength: [500, "Description must be at most 500 characters long"],

    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],

    comments: [commentSchema]
})

module.exports = mongoose.model("Idea", IdeaSchema);