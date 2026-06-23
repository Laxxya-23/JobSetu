const express = require("express");
const router = express.Router();

const Job = require("../models/Job");

// =========================
// ADD JOB
// =========================

router.post("/add-job", async (req, res) => {

    try {

        const job = new Job(req.body);

        await job.save();

        res.status(201).json({
            success: true,
            message: "Job Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// =========================
// GET ALL JOBS
// =========================

router.get("/jobs", async (req, res) => {

    try {

        const jobs = await Job.find().sort({
            createdAt: -1
        });

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// =========================
// GET SINGLE JOB
// =========================

router.get("/job/:id", async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            });
        }

        res.json(job);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// =========================
// UPDATE JOB
// =========================

router.put("/update-job/:id", async (req, res) => {

    try {

        const updatedJob =
            await Job.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json({
            success: true,
            message: "Job Updated Successfully",
            data: updatedJob
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// =========================
// DELETE JOB
// =========================

router.delete("/delete-job/:id", async (req, res) => {

    try {

        await Job.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Job Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;