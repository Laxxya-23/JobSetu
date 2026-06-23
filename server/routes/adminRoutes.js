const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");

// Login

router.post("/admin-login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const admin =
        await Admin.findOne({
            username,
            password
        });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });

        }

        res.json({
            success: true,
            message: "Login Successful"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;