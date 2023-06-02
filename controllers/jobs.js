const Job = require('../models/job')
const { generateError } = require('../errors/generateError')

const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({ createdBy: req.user.userId })
        if(!jobs) {
            return next(generateError(404, 'unexpected error'))
        }
        res.status(200).json(jobs)
    } catch(err) {
        return next(err)
    }
}

const createJob = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId 
        const job = await Job.create(req.body)
        if(!job) {
            return next(generateError(404, 'couldn\'t create'))
        }
        res.status(200).json(job)
    } catch(err) {
        return next(err)
    }
}

const getSingleJob = async (req, res, next) => {
    try {
        const job = await Job.findById({_id: req.params.id}).exec()
        if(!job) {
            return next(generateError(404, 'no such id'))
        }
        res.status(200).json(job)
    } catch(err) {
        return next(err)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate({_id: req.params.id}, req.body)
        if(!job) {
            return next(generateError(404, 'unable to update'))
        }
        res.status(200).json(job)
    } catch(err) {
        return next(err)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndRemove({_id: req.params.id})
        if(!job) {
            return next(generateError(404, 'no such id'))
        }
        res.status(200).json(job)
    } catch(err) {
        return next(err)
    }
}

module.exports = { 
    getAllJobs, 
    createJob, 
    getSingleJob, 
    updateJob, 
    deleteJob 
}