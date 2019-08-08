const express = require('express')
const logger = require('../logger')
const bookmarks = require('../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params
        const bookmark = bookmarks.find(bk => bk.id === id)
        if(!bookmark){
            logger.error(`Bookmark id ${id} requested and not found`)
            res.status(404).send('Not Found')
        }
        res.json(bookmark)
    })

module.exports = bookmarksRouter
