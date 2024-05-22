require('dotenv').config()
const express = require('express')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const cors = require('cors')


const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validation')
const {candidateValidationSchema, candidateEditValidationSchema} = require('./app/validations/candidate-validation')
const recruiterValidationSchema  = require('./app/validations/recruiter-validation')
const jobValidationSchema = require('./app/validations/job-validation')
// const jobEditValidationSchema = require('./app/validations/job-validation')
// const jobIdValidationSchema = require('./app/validations/job-validation')
const {applicationValidationSchema, applicationTrackSchema, applicationEditValidation} = require('./app/validations/application-validation')
//const morgan =require('morgan')
const usersCltr = require('./app/controllers/users-cltr')
const jobsCltr = require('./app/controllers/jobs-cltr') 
const candidatesCltr = require('./app/controllers/candidates-cltr')
const recruitersCltr = require('./app/controllers/recruiter-cltr')
const applicationsCltr = require('./app/controllers/applications-cltr')
const app = express() 
const port = 3333 
configureDB()

app.use(express.json())
app.use(cors())

//app.use(morgan('combined'))

//application level middleware - using it for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')


app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register)
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login)

// routing level middleware.

app.get('/users/account', authenticateUser, usersCltr.account)
app.get('/users/checkemail', usersCltr.checkEmail)

// app.get('/api/jobs', jobsCltr.list) 
// app.post('/api/jobs', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobValidationSchema) ,jobsCltr.create)
// app.get('/api/jobs/my', authenticateUser, jobsCltr.my)
// app.put('/api/jobs/:id', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobEditValidationSchema), jobsCltr.update)
// app.delete('/api/jobs/:id', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobIdValidationSchema), jobsCltr.remove)


//job
app.get('/api/jobs', jobsCltr.list) 
app.get('/api/jobs/my', authenticateUser, authorizeUser(['recruiter']), jobsCltr.my)
app.get('/api/jobs/:id', jobsCltr.show)

app.get('/api/jobs/:id/applications', authenticateUser, authorizeUser(['recruiter']), jobsCltr.applications)
app.get('/api/jobs/:id/applications/:appId', authenticateUser, authorizeUser(['recruiter']), jobsCltr.singleApplication)
app.put('/api/jobs/:id/applications/:appId', authenticateUser, authorizeUser(['recruiter']), checkSchema(applicationEditValidation),jobsCltr.applicationUpdate)


app.post('/api/jobs', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobValidationSchema),jobsCltr.create)
app.put('/api/jobs/:id', authenticateUser, authorizeUser(['recruiter']), checkSchema(jobValidationSchema), jobsCltr.update)
app.delete('/api/jobs/:id', authenticateUser, authorizeUser(['recruiter']), jobsCltr.remove)

//application
app.post('/api/applications', authenticateUser, authorizeUser(['candidate']), checkSchema(applicationValidationSchema), applicationsCltr.apply)
app.get('/api/applications/check/:jobId', authenticateUser, authorizeUser(['candidate','recruiter']), applicationsCltr.check)

app.get('/api/applications', authenticateUser, authorizeUser(['recruiter']), applicationsCltr.list)

//app.get('/api/applications/candidate/:jobId', authenticateUser, authorizeUser(['candidate', 'recruiter']), applicationsCltr.candidate)




//profile.
app.post('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateValidationSchema), candidatesCltr.create)
app.get('/api/candidates/profile', authenticateUser, authorizeUser(['candidate',]), candidatesCltr.show)
app.put('/api/candidates/profile', authenticateUser, authorizeUser(['candidate']), checkSchema(candidateEditValidationSchema), candidatesCltr.update)

app.post('/api/recruiters/profile', authenticateUser, authorizeUser(['recruiter']), checkSchema(recruiterValidationSchema), recruitersCltr.create)
app.get('/api/recruiters/profile', authenticateUser, authorizeUser(['recruiter']), recruitersCltr.show)
//app.put('/api/recruiters/profile', authenticateUser, authorizeUser(['recruiter']), checkSchema(recruiterEditValidationSchema), recruitersCltr.update)


app.listen(port, () => {
    console.log('server running on port', port)
})