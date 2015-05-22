Meteor.startup(function() {

    _.extend(UsersManagerType.prototype, {
        //ctor: function() {
        //    var thatManager =this.thatManager;
        //    var cgu = JSON.parse(Assets.getText('users/cgu.json'));
        //    cgu._newId = cgu.id;
        //    delete cgu.id;
        //    debugger;
        //    thatManager.createUserResponseMethod({body:cgu});
        //},
        createIntercomUserResponseObject: function(intercomUser) {
            var response;
            if ( intercomUser ) {
                var response = _.omit(intercomUser.toJSONValue(),
                    '_id', 'tagIds', 'lastModifiedAt', 'createdAt'
                );
                response.id = intercomUser.id;
                response.created_at = intercomUser.createdAt;
                if (intercomUser.tagIds) {
                    var intercomTags = IntercomTags.findFetchById(intercomUser.tagIds);
                    response.tags = _.map(intercomTags, function (intercomTag) {
                        return intercomTag.toJSONObject();
                    });
                }
            } else {
                response = {"type":"error.list",
                    "request_id":"10e5665e-3e99-4e18-a04a-72f75f64a806",
                    "errors":[
                        {"code":"not_found","message":"User Not Found"}
                    ]
                };
            }

            return response;
        },

        createUserResponseMethod: function(request) {
            var thatManager = this.thatManager;
            /* key: param, (required), dox
            user_id (yes if no email a unique string identifier for the user.) It is required on
            creation if an email is not supplied.

            email (yes if no user_id the user’s email address.) It is required on creation if a
            user_id is not supplied.

            id (no) The id may be used for user updates.

            signed_up_at (no) The time the user signed up

            name (no) The user’s full name

            last_seen_ip (no) An ip address (e.g. “1.2.3.4”) representing the last ip address the user
            visited your application from. (Used for updating location_data)

            custom_attributes (no) A hash of key/value pairs containing any other data about the user
            you want Intercom to store.*

            last_seen_user_agent (no) The user agent the user last visited your application with.

            companies (no) Identifies the companies this user belongs to.

            last_request_at (no) A UNIX timestamp representing the date the user last visited your
            application.

            unsubscribed_from_emails (no) A boolean value representing the users unsubscribed
            status. default value if not sent is false.

            update_last_request_at (no) A boolean value, which if true, instructs Intercom to
            update the users’ last_request_at value to the current API service time in
            UTC. default value if not sent is false.

            new_session (no) A boolean value, which if true, instructs Intercom to register the
            request as a session.
            */
            var intercomUser;
            var body = request.body;
            var intercomId = body.id;
            var email = body.email;
            var userId = body.user_id;
            var userData = _.omit(body, 'id');
            var updateNeeded = true;

            if ( intercomId ) {
                intercomUser = IntercomUser.findOneById(intercomId);
                if ( intercomUser == null ) {
                    return {
                        statusCode: 404
                    };
                }
            } else {
                intercomUser = IntercomUser.findOneByUser_id(userId);
                if ( intercomUser == null) {
                    // TODO: simulate issue with multiple users with same email.
                    intercomUser = IntercomUser.findOneByEmail(email);
                }
                if ( intercomUser == null ) {
                    intercomUser = new IntercomUser(userData);
                    intercomUser._save();
                    updateNeeded = false;
                }
            }
            debugger;
            if ( updateNeeded) {
                intercomUser = intercomUser.upsertFromUntrusted({clientObj:userData});
            }
            return {
                body: thatManager.createIntercomUserResponseObject(intercomUser)
            };
        },
        getUserByIntercomIdResponseMethod: function(intercomId) {
            var thatManager = this.thatManager;
            var intercomUser = IntercomUser.findOneById(intercomId);
            if ( intercomUser == null ) {
                thatManager.log("Did not find intercomId=", intercomId,
                    "in local db. asking intercom");
                var intercomIoData = Intercom.syncViewUser({id:intercomId});
                if ( intercomIoData ) {
                    var intercomUser = new IntercomUser(intercomIoData);
                    intercomUser._save();
                }
            }
            return {
                body: thatManager.createIntercomUserResponseObject(intercomUser)
            };
        },
        getUserByWhalePathUserIdResponseMethod: function(userId) {
            var thatManager = this.thatManager;
            var intercomUser = IntercomUser.findOneByUser_id(userId);
            if ( intercomUser == null ) {
                thatManager.log("Did not find userId=", userId,
                    "in local db. asking intercom");
                var intercomIoData = Intercom.syncViewUser({user_id:userId});
                if ( intercomIoData ) {
                    var intercomUser = new IntercomUser(intercomIoData);
                    intercomUser._save();
                }
            }
            return {
                body: thatManager.createIntercomUserResponseObject(intercomUser)
            };
        },
        getUserByEmailResponseMethod: function(email) {
            var thatManager = this.thatManager;
            var intercomUser = IntercomUser.findOneByEmail(email);
            if ( intercomUser == null ) {
                thatManager.log("Did not find email=", email,
                    "in local db. asking intercom");
                var intercomIoData = Intercom.syncViewUser({email:email});
                if ( intercomIoData ) {
                    var intercomUser = new IntercomUser(intercomIoData);
                    intercomUser._save();
                }
            }
            return {
                body: thatManager.createIntercomUserResponseObject(intercomUser)
            };
        },
        tagUserMethod: function(intercomTag, userTagOperation) {
            var thatManager = this.thatManager;
            var intercomUser;
            var intercomId = userTagOperation.id;
            var userId = userTagOperation.user_id;
            var email = userTagOperation.email;
            if ( intercomId ) {
                intercomUser = IntercomUser.findOneById(intercomId);
                if ( intercomUser == null ) {
                    return {
                        statusCode: 404
                    };
                }
            } else {
                if (userId) {
                    intercomUser = IntercomUser.findOneByUser_id(userId);
                }
                if (intercomUser == null) {
                    intercomUser = IntercomUser.findOneByEmail(email);
                }
                if (intercomUser == null) {
                    return {
                        statusCode: 404
                    };
                }
            }

            if( userTagOperation.untag === true) {
                IntercomUser.updateOneById(intercomUser.id, {
                    $pull: {'tagIds': intercomTag.id}
                });
            } else {
                IntercomUser.updateOneById(intercomUser.id, {
                    $push: {'tagIds': intercomTag.id}
                });
            }
        }
    });
});
