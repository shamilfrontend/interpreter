const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./middleware/passport-google-oauth20')

// init app
const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const v1Routes = require('./routes/v1')

app.use('/api/v1', v1Routes)

module.exports = app
