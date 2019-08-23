const BookmarksService = {
    getAllBookmarks(knex){
        return knex.select('*').from('bookmarks_list')
    },
    getById(knex, id){
        return knex.select('*').from('bookmarks_list').where('id', id).first()
    }
}

module.exports = BookmarksService