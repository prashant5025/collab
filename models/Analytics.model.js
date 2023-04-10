const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsSchema = new Schema({

});

module.exports = mongoose.model('Analytics', analyticsSchema);