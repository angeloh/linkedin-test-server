/*
Note definition:
 type	string	value is ‘note’
 id	string	The id representing the note
 created_at	timestamp	The time the note was created
 user	User	The user the note was created about
 body	string	The body text of the note.
 author	Admin	Optional. Represents the Admin that created the note

 {
 "type": "note",
 "id": "16",
 "created_at": 1389913941,
 "body": "<p>Text for my note</p>",
 "author": {
 "type": "admin",
 "id": "21",
 "name": "Jayne Cobb",
 "email": "jayne@serenity.io",
 "companies": []
 },
 "user": {
 "type": "user",
 "id": "5310d8e8598c9a0b24000005"
 }
 }

 --------

 user	Yes	Representation of the user the note is to be created about.
 user.user_id	one of	Your user_id for the user
 user.email	one of	Your email address for the user
 user.id	one of	The user id for the user
 admin_id	No	The id of the admin creating the note.
 body	Yes	The text of the note.


 */
Router.map(function() {
    this.route('notes', {
        path:'notes',
        where: 'server'
    }).post(function() {
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
        var adminId = this.request.body.admin_id;
        var noteBody = this.request.body.body;
        var user = this.request.body.user;
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

        var response = {
            type:"note",
            id: Math.random(),
            created_at: new Date,
            body: noteBody,
            author: author,
            user: responseUser
        };
        sendJSONResponse(this, response);
        /*
 HTTP/1.1 200 OK

 {
 "type": "note",
 "id": "16",
 "created_at": 1389913941,
 "body": "<p>Text for my note</p>",
 "author": {
 "type": "admin",
 "id": "21",
 "name": "Jayne Cobb",
 "email": "jayne@serenity.io",
 "companies": []
 },
 "user": {
 "type": "user",
 "id": "5310d8e8598c9a0b24000005"
 }
 }

 */
    });
});
/*
 user_id	one of	The user id you have defined for the user
 email	one of	The email you have defined for the user
 intercom_user_id	one of	The Intercom defined id representing the user
 */
/*
 curl https://api.intercom.io/notes?user_id=25 \
 -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
 -H 'Accept: application/json'
 Example Email Request
 $ curl https://api.intercom.io/notes?email=jayne%40serenity.io \
 -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
 -H 'Accept: application/json'

 HTTP/1.1 200 OK

 {
 "type": "note.list",
 "notes": [
 {
 "type": "note",
 "id": "1",
 "created_at": 1389913941,
 "body": "<p>Text for my note</p>",
 "author": {
 "type": "admin",
 "id": "21",
 "name": "Jayne Cobb",
 "email": "jayne@serenity.io",
 "companies": []
 },
 "user": {
 "type": "user",
 "id": "5310d8e8598c9a0b24000005"
 }
 },
 {
 "type": "note",
 "id": "2",
 "created_at": 1389913951,
 "body": "<p>Text for my note</p>",
 "user": {
 "id": "5310d8e8598c9a0b24000005",
 "type": "user"
 }
 }
 ],
 "pages": {}
 }
 */