Meteor.startup(function() {
    _.extend(NoteManagerType.prototype, {
        /*
         curl https://api.intercom.io/notes \
         -X POST \
         -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
         -H 'Accept: application/json'  \
         -H 'Content-Type: application/json' -d '
         {
         "admin_id" : "21",
         "body": "Text for my note",
         "user": {
         "id" : "5310d8e8598c9a0b24000005"
         }
         }'
         */

        createNoteResponse: function(request) {
            var adminId = request.body.admin_id;
            var noteBody = request.body.body;
            var user = request.body.user;
            // TODO: see if user exists.
            // TODO: see if adminId exists.
            var responseUser = _.extend({
                type: 'user'
            }, user);
            var author = {
                type: 'admin',
                id: adminId,
                name: 'author name',
                email: 'author@email.com',
                companies: []
            };

            var intercomNote = new IntercomNote({
                created_at: new Date(),
                body: noteBody,
                author: author,
                userId: user
            });


            var response = {
                type:"note",
                id: Math.random(),
                created_at: new Date,
                body: noteBody,
                author: author,
                user: responseUser
            };
        }
    })
});