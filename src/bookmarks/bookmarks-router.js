const path = require('path')
const express = require('express')
const logger = require('../logger')
// const bookmarks = require('../store')
const uuid = require('uuid/v4')
const validateURL = require('../validateURL')
const BookmarksService = require('./bookmarks-service')
const xss = require('xss')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    title: xss(bookmark.title),
    url: xss(bookmark.url),
    description: xss(bookmark.description),
    rating: bookmark.rating
})

bookmarksRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BookmarksService.getAllBookmarks(knexInstance)
            .then(bookmarks => {
                res.json(bookmarks.map(serializeBookmark))
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const { title, url, rating } = req.body
        const ratingVal = parseInt(rating)

        if(!title || title.trim() === ''){
            logger.error(`Title is required`)
            return res.status(400).send('Invalid data')
        }
        if(!url){
            logger.error(`URL is required`)
            return res.status(400).send('Invalid data')
        }
        if(!rating){
            logger.error(`Rating is required`)
            return res.status(400).send('Invalid data')
        }
        if(!validateURL(url)){
            logger.error(`URL param received invalid format: ${url}`)
            return res.status(400).send('Invalid data')
        }
        if(Number.isNaN(ratingVal) || ratingVal > 5 || ratingVal < 1){
            logger.error(`Received invalid rating param of ${ratingVal}`)
            return res.status(400).send('Invalid data')
        }
        const newBookmark = {
            title: req.body.title,
            url: req.body.url,
            description: req.body.description || '',
            rating: req.body.rating
        }

        BookmarksService.insertBookmark(
            req.app.get('db'),
            newBookmark
        )
        .then(bookmark => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${bookmark.id}`))
                .json(serializeBookmark(bookmark))
        })
        .catch(next)
    })

    bookmarksRouter
        .route('/:bookmark_id')
        .all((req, res, next) => {
            const { bookmark_id } = req.params
            BookmarksService.getById(req.app.get('db'), bookmark_id)
            .then(bookmark => {
                if (!bookmark) {
                logger.error(`Bookmark with id ${bookmark_id} not found.`)
                return res.status(404).json({
                    error: { message: `Bookmark Not Found` }
                })
                }
                res.bookmark = bookmark
                next()
            })
            .catch(next)
        })
        .get((req, res) => {
            res.json(serializeBookmark(res.bookmark))
        })
        .delete((req, res, next) => {
            const { bookmark_id } = req.params
            BookmarksService.deleteBookmark(
            req.app.get('db'),
            bookmark_id
            )
            .then(numRowsAffected => {
                logger.info(`Bookmark with id ${bookmark_id} deleted.`)
                res.status(204).end()
            })
            .catch(next)
  })

module.exports = bookmarksRouter
