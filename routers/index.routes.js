const express = require('express');
const mainRouter = express.Router();
const careerRoutes = require('./department.routes')
const applicantRoues = require('./applicants.routes')
mainRouter.use('/career', careerRoutes)
mainRouter.use('/applicants', applicantRoues)
module.exports = mainRouter