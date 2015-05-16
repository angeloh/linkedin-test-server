/**
 * AuthenticationManager
 */
TaggingManager = null;

TaggingManagerType = ManagerType.create({
    callPrefix: 'intercomTagging',
    meteorCallDefinitions: [
        {
            //createAuthentication: {
            //    permissionCheck: 'public'
            //}
        }
    ]
});

Meteor.startup(function(){
    Object.freeze(TaggingManagerType.prototype);
    TaggingManager = new TaggingManagerType();
});
