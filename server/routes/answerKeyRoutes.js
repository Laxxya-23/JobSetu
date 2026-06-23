const express = require("express");
const router = express.Router();

const AnswerKey =
require("../models/AnswerKey");

router.post("/add-answerkey",
async (req, res) => {

    try {

        const key =
            new AnswerKey(req.body);

        await key.save();

        res.json({
            success: true,
            message:
                "Answer Key Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/answerkeys",
async (req, res) => {

    try {

        const keys =
            await AnswerKey.find().sort({
                createdAt: -1
            });

        res.json(keys);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;