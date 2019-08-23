const knex = require('knex')
const app = require('../src/app')
const { makeBookmarksArray } = require('./bookmarks.fixtures.js')

describe.only('Bookmarks Endpoints', function() {
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db('bookmarks_list').truncate())
    afterEach('cleanup', () => db('bookmarks_list').truncate())

    describe('GET /articles', () => {
        context('Given no articles in the db', () => {
            it('responds with 200 and an empty list', () => {
              return supertest(app)
                .get('/bookmarks')
                .expect(200, [])
            })
        })
    })
})