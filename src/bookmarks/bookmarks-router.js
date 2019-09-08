const express = require('express')
const logger = require('../logger')
// const bookmarks = require('../store')
const uuid = require('uuid/v4')
const validateURL = require('../validateURL')
const BookmarksService = require('./bookmarks-service')
const xss = require('xss')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

// const serializeBookmark = bookmark => ({
//     id: bookmark.id,
//     title: xss(bookmark.title),
//     url: xss(bookmark.url),
//     description: xss(bookmark.description),
//     rating: bookmark.rating
// })

bookmarksRouter
    .route('/bookmarks')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BookmarksService.getAllBookmarks(knexInstance)
            .then(bookmarks => {
                res.json(bookmarks)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { title, url, description = '', rating } = req.body
        const ratingVal = parseInt(rating)

        if(!title || title.trim() === ''){
            logger.error(`Title is required`)
            res.status(400).send('Invalid data')
        }
        if(!url){
            logger.error(`URL is required`)
            res.status(400).send('Invalid data')
        }
        if(!rating){
            logger.error(`Rating is required`)
            res.status(400).send('Invalid data')
        }
        if(!validateURL(url)){
            logger.error(`URL param received invalid format: ${url}`)
            res.status(400).send('Invalid request')
        }
        if(Number.isNaN(ratingVal) || ratingVal > 5 || ratingVal < 1){
            logger.error(`Received invalid rating param of ${ratingVal}`)
            res.status(400).send('Invalid request')
        }
        const newBookmark = {
            id: uuid(),
            title: req.body.title,
            url: req.body.url,
            description: req.body.description,
            rating: req.body.description
        }

        BookmarksService.insertBookmark(
            req.app.get('db'),
            newBookmark
        )
        .then(bookmark => {
            res
                .status(201)
                .location(`/bookmarks/${bookmark.id}`)
                .json(bookmark)
        })
        .catch(next)
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { id } = req.params
        BookmarksService.getById(knexInstance, id)
            .then(bookmark => {
                if(!bookmark){
                    logger.error(`Bookmark id ${id} requested and not found`)
                    res.status(404).send('Not Found')
                }
                res.json(bookmark)
            })
            .catch(next)
        // const bookmark = bookmarks.find(bk => bk.id === id)
    })
    .delete((req, res) => {
        const { id } = req.params

        const bookmarksIndex = bookmarks.findIndex(item => item.id === id)

        if (bookmarksIndex === -1){
            logger.error(`Invalid id of ${id} supplied, id not found`)
            return res.status(404).send('Not Found')
        }

        bookmarks.splice(bookmarksIndex, 1)

        logger.info(`Bookmark with id ${id} deleted`)

        res.status(204).end()
    })

module.exports = bookmarksRouter
