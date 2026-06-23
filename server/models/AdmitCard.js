const mongoose = require("mongoose");

const AdmitCardSchema =
new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    admitCardLink: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
mongoose.model(
    "AdmitCard",
    AdmitCardSchema
);