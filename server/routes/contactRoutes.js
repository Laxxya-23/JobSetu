const express = require("express");
const router = express.Router();

const Contact =
require("../models/Contact");

router.post("/contact",
async (req, res) => {

    try {

        const contact =
            new Contact(req.body);

        await contact.save();

        res.json({
            success: true,
            message:
                "Query Submitted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;