const Application = require('../models/application-model')
// const Candidate = require('../models/candidate-model')
const { validationResult } = require('express-validator')
const _ = require('lodash')
const applicationsCltr = {}

applicationsCltr.apply = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    
    try { 
        const body = _.pick(req.body, ['job']) // we are extracing only job from body, ensuring only job is taken from body.
        const application = new Application(body)
        application.candidate = req.user.id // when ever we are saving in db we have to assign the user and then save in db
        await application.save() // we are applying for the job by passing jobId in body, and status is set to default in application model 
        res.json(application)
    } catch(err) {
        console.log(err) 
        res.status(500).json({error: 'something went wrong'})
    }

}

applicationsCltr.check = async (req, res) => {
    const jobId = req.params.jobId 
    try { 
        const application = await Application.findOne({ job: jobId, candidate: req.user.id })
        if(!application) {
            return res.json({})
        }
        res.json(application)
    } catch(err) {
        console.log(err) 
        res.json(err) 
    }
}

applicationsCltr.list = async (req, res) => {
    const jobId = req.query.jobId // job id is coming from query
    const applications = await Application.find({ job: jobId})
    res.json(applications)
}

// applicationsCltr.candidate = async (req,res) => {
//     try{
//     const id = req.params.id
//     const app = await Application.findOne({_id:id})
//     console.log(app)
//     if(!app) {
//         return res.json({})
//     }
//     const can = await Candidate.findOne({userId: app.candidate})
//     console.log(can)
//     res.json(can)
// } catch(err) {
//     res.status(500).json({errors:'something went wrong'})
// }
// }


module.exports = applicationsCltr