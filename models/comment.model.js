const mongoose = require('mongoose');

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


