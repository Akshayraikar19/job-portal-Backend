const Application = require('../models/application-model')
const applicationValidationSchema = {
    job: {
        in: ['body'],
        exists: { 
            errorMessage: 'job is required'
        },
        notEmpty: {
            errorMessage: 'job cannot be emtpy'
        },
        isMongoId: {
            errorMessage: 'job should be a valid'
        },
        custom: {
            options: async function(value, { req }){ // we are checking if the candidate has applied for the job, in model there is jobId
                const application = await Application.findOne({ job: value, candidate: req.user.id }) //  we are picking only job field from the user value will be the job id
                if(application) {
                    throw new Error('You have already applied for this job')
                }
                return true 
            }
        }
    }
}

const applicationEditValidation = {
    status: {
        in: ['body'],
        exists: {
            errorMessage: 'status is required'
        },
        trim: true,
        notEmpty: {
            errorMessage: 'status cannot be empty'
        },
        isIn: {
            options: [['accepted', 'under-review', 'rejected']],
            errorMessage: 'should be either of accepted, under-review, or rejected'
        }
    }

}

const applicationTrackSchema = {

}

module.exports = {
    applicationValidationSchema,
    applicationTrackSchema,applicationEditValidation
}