Meteor.startup(function() {
    //var DefaultTags = [
    //    {
    //        type: "tag",
    //        name: "Customer",
    //        id:"1"
    //    },
    //    {
    //        type: "tag",
    //        name: "Qualified Lead",
    //        id:"2"
    //    },
    //    {
    //        type: "tag",
    //        name: "Lead",
    //        id:"3"
    //    },
    //    {
    //        type: "tag",
    //        name: "Analyst",
    //        id:"4"
    //    },
    //    {
    //        type: "tag",
    //        name: "Unqualified",
    //        id:"10"
    //    },
    //];
    //_.each(DefaultTags, function(defaultTag) {
    //    var tag = IntercomTag.findOneByName(defaultTag.name);
    //    if ( tag == null) {
    //        defaultTag._newId = defaultTag.id;
    //        var intercomTag = new IntercomTag(defaultTag);
    //        intercomTag._save();
    //    }
    //});
    //
    //debugger;
    _.extend(TagsManagerType.prototype, {
        ctor: function() {
            var intercomIoData = Intercom.syncGetTag({});
            _.each(intercomIoData.tags, function(tag) {
                var intercomTag = new IntercomTag(tag);
                if ( IntercomTag.findOneById(intercomTag._newId)) {
                    // TODO: need upsert ability.
                } else {
                    intercomTag._save();
                }
            })
        },
        getTagsResponseMethod: function(request) {
            // TODO : modify based on needs.
            var query = {};
            var intercomTags = IntercomTag.findFetch(query);
            var tagResponse = [];
            _.each(intercomTags, function(intercomTag) {
                tagResponse.push({
                    id: intercomTag.id,
                    name: intercomTag.name
                });
            });
            var response = {
                body: {
                    type: "tag.list",
                    tags: tagResponse,
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
            var thatManager = this.thatManager;
            var body = request.body;
            var name = body.name;
            var id = body.id;
            var intercomTag;
            if ( id != null ) {
                intercomTag = IntercomTag.findOneById(id);
                if (intercomTag == null) {
                    return {
                        statusCode: 404,
                        body: {
                            // intercom error response
                        }
                    };
                } else {
                    intercomTag.upsertFromUntrusted({clientObj:_.pick(request.body, 'name')});
                }
            } else {
                var regExp = new RegExp(name, 'i');
                intercomTag = IntercomTag.findOneByName(regExp);
                if ( intercomTag == null ) {
                    intercomTag = new IntercomTag({
                        type: "tag",
                        name: name
                    });
                }
                intercomTag._save();
            }

            var users = body.users;
            if (_.isArray(users)) {
                _.each(users, function(userTagOperation) {
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
            var responseBody = {
                id: intercomTag.id,
                type: intercomTag.type,
                name: intercomTag.name
            };
            return {
                body: responseBody
            };
        },
    });
})