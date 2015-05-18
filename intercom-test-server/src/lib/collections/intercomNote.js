/**
 * type	string	value is ‘note’
 * id	string	The id representing the note
 * created_at	timestamp	The time the note was created
 * user	User	The user the note was created about
 * body	string	The body text of the note.
 * author	Admin	Optional. Represents the Admin that created the note
 * @type {*}
 */
IntercomNote = DbObjectType.create({
    typeName: 'intercomNote',
    properties: {
        type:{
            defaultValue: 'note',
            secured: true
        },

    },
    databaseTableName: 'intercomNote',
});