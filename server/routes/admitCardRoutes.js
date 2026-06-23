const express = require("express");
const router = express.Router();

const AdmitCard =
require("../models/AdmitCard");

router.post("/add-admitcard",
async (req, res) => {

    try {

        const card =
            new AdmitCard(req.body);

        await card.save();

        res.json({
            success: true,
            message:
                "Admit Card Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/admitcards",
async (req, res) => {

    try {

        const cards =
            await AdmitCard.find().sort({
                createdAt: -1
            });

        res.json(cards);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;