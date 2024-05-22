const Recruiter = require('../models/recruiter-model')
const recruiterValidationSchema = {
    userId: {
        custom: {
            options: async function(value, { req }){
                const recruiter = await Recruiter.findOne({ userId: req.user.id })
                if(recruiter) {
                    throw new Error('Profile already created')
                } else {
                    return true 
                }
            }
        }
    },
    companyName: {
        in: ['body'],
        exists: {
            errorMessage: 'Company name is required'
        },
        notEmpty: {
            errorMessage: 'Company name cannot be empty'
        },
        trim: true 
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        trim: true 
    },
    website: {
        in: ['body'],
        exists: {
            errorMessage: 'website is required'
        },
        notEmpty: {
            errorMessage: 'website cannot be empty'
        },
        trim: true 
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true 
    }
}

// // const recruiterEditValidationSchema = {
// //     firstName: {
// //         in: ['body'],
// //         exists: {
// //             errorMessage: 'first name is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'first name cannot be empty'
// //         },
// //         trim: true 
// //     },
// //     lastName: {
// //         in: ['body'],
// //         exists: {
// //             errorMessage: 'last name is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'last name cannot be empty'
// //         },
// //         trim: true 
// //     },
// //     mobile: {
// //         in: ['body'],
// //         exists: {
// //             errorMessage: 'mobile is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'mobile cannot be empty'
// //         },
// //         isNumeric: {
// //             errorMessage: 'mobile should be a number'
// //         }, 
// //         isLength: {
// //             options: { min: 10, max: 10 },
// //             errorMessage: 'mobile should be 10 digits long'
// //         },
// //         trim: true 
// //     },
// //     address: {
// //         in: ['body'],
// //         exists: {
// //             errorMessage: 'address is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'address cannot be empty'
// //         },
// //         trim: true 
// //     }
// // }

module.exports = recruiterValidationSchema
   //  recruiterEditValidationSchema
