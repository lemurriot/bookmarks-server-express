const express = require('express')
const logger = require('../logger')
const bookmarks = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/')
    .get((req, res) => {
      res.send('hello world')
    })

    module.exports = bookmarksRouter
