const BookmarksService = {
    getAllBookmarks(knex){
        return knex.select('*').from('bookmarks_list')
    },
    getById(knex, id){
        return knex.select('*').from('bookmarks_list').where('id', id).first()
    },
    insertBookmark(knex, newBookmark){
        return knex.insert(newBookmark).into('bookmarks_list').returning('*').then(rows => rows[0])
    }
}

module.exports = BookmarksService