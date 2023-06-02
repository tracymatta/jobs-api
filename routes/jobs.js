const express = require('express')
const { getAllJobs, createJob, getSingleJob, updateJob, deleteJob } = require('../controllers/jobs')

const router = express.Router()

router.route('/')
    .get(getAllJobs)
    .post(createJob)

router.route('/:id')
    .get(getSingleJob)
    .patch(updateJob)
    .delete(deleteJob)

module.exports = router