Meteor.startup(function() {
    var DefaultTags = [
        {
            type: "tag",
            name: "Customer",
            id:"1"
        },
        {
            type: "tag",
            name: "Qualified Lead",
            id:"2"
        },
        {
            type: "tag",
            name: "Lead",
            id:"3"
        },
        {
            type: "tag",
            name: "Analyst",
            id:"4"
        },
        {
            type: "tag",
            name: "Unqualified",
            id:"10"
        },
    ];
    _.each(DefaultTags, function(defaultTag) {
        var tag = IntercomTag.findOneByName(defaultTag.name);
        if ( tag == null) {
            defaultTag._newId = defaultTag.id;
            var intercomTag = new IntercomTag(defaultTag);
            intercomTag._save();
        }
    });

    debugger;
    _.extend(TagsManagerType.prototype, {
        getTagsResponseMethod: function(request) {
            // TODO : modify based on needs.
            var query = {};
            var tags = IntercomTag.findFetch(query);
            var response = {
                body: {
                    type: "tag.list",
                    tags: tags,
                    pages: {}
                }
            };
            return response;
        },
        /*
        response:
        {
            "type": "tag",
            "name": "Independent",
            "id": "17513"
        }
        */
        createUpdateTagResponseMethod: function(request) {
            var name = request.body.name;
            var id = request.body.id;
            var intercomTag;
            if ( id == null ) {
                intercomTag = new IntercomTag({
                    type: "tag",
                    name: name
                });
                intercomTag._save();
            } else {
                intercomTag = IntercomTag.findOneById(id);
                if (intercomTag == null) {
                    return {
                        statusCode: 404,
                        body: {
                            // intercom error response
                        }
                    };
                } else {
                    intercomTag.upsertFromUntrusted(_.pick(request.body, 'name'));
                }
            }

            var users = request.body.users;
            if (_.isArray(users)) {

                _.each(users, function(user) {
                     UsersManager.tagUserMethod(intercomTag, userTagOperation);
                });
            } else if ( users != null ){
                return {
                    statusCode: 404,
                    body: {
                        // intercom error response
                    }
                };
            }
            return {
                body: EJSON.stringify(intercomTag)
            };
        },
    });
})