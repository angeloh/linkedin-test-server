/**
 * AuthenticationManager
 */
TagsManager = null;

TagsManagerType = ManagerType.create({
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
    Object.freeze(TagsManagerType.prototype);
    TagsManager = new TagsManagerType();
});
