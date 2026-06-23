const mongoose = require("mongoose");

const AnswerKeySchema =
new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    answerKeyLink: {
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
    "AnswerKey",
    AnswerKeySchema
);