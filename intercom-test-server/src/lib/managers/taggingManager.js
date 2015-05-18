/**
 * AuthenticationManager
 */
TaggingManager = null;

TaggingManagerType = ManagerType.create({
    callPrefix: 'intercomTagging',
    meteorCallDefinitions: [
        {
            getTagsResponse: {
                permissionCheck: 'public'
            }
        }
    ]
});

Meteor.startup(function(){
    Object.freeze(TaggingManagerType.prototype);
    TaggingManager = new TaggingManagerType();
});
