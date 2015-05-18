/**
 */
NotesManager = null;

NotesManagerType = ManagerType.create({
    callPrefix: 'intercomNoting',
    meteorCallDefinitions: [
        {
            createUpdateNoteResponse: {
                permissionCheck: 'public'
            }
        }
    ]
});

Meteor.startup(function(){
    Object.freeze(NotesManagerType.prototype);
    NotesManager = new NotesManagerType();
});
