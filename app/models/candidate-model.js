const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const candidateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // it will be unique type, we will be extracting it from req object(authentication)
        ref: 'User'
    },
    firstName: String,
    lastName: String,
    mobile: String,
    address: String, 
}, { timestamps: true })

const Candidate = model('Candidate', candidateSchema)

module.exports = Candidate 