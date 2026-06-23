const express = require("express");
const router = express.Router();

const Result = require("../models/Result");

router.post("/add-result", async (req, res) => {

    try {

        const result = new Result(req.body);

        await result.save();

        res.json({
            success: true,
            message: "Result Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

router.get("/results", async (req, res) => {

    try {

        const results =
            await Result.find().sort({
                createdAt: -1
            });

        res.json(results);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;