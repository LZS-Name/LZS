const express = require('express')
const router = express.Router()
const applicationRouter = require('./application')

// Getting all
router.use('/application/', applicationRouter)


module.exports = router