const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    resultLink: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
mongoose.model("Result", ResultSchema);