const mongoose = require("mongoose");
const { Schema } = mongoose;
/*
id: string
user_id: string (foreign key to Users table)
company_name: string
industry: string
location: string
investment_focus: string
website: string
*/ 
const investerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    company_name: {
        type: String,
        trim: true,
        minlength: [3, "Company name must be at least 3 characters long"],
    },
    industry: {
        type: String,
        minlength: [3, "Industry must be at least 3 characters long"],

    },
    location: {
        type: String,
        minlength: [3, "Location must be at least 3 characters long"],

    },
    investment_focus: {
        type: String,
        minlength: [3, "Investment focus must be at least 3 characters long"],
    },
    website: {
        type: String,
        minlength: [3, "Website must be at least 3 characters long"],
    },

    
});


module.exports = mongoose.model("Investor", investerSchema);