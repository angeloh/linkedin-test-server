/**
 * UsersManager
 */
UsersManager = null;

UsersManagerType = ManagerType.create({
    callPrefix: 'intercomUsers',
    meteorCallDefinitions: [
        {
            getTagsResponse: {
                permissionCheck: 'public'
            }
        }
    ]
});

Meteor.startup(function(){
    Object.freeze(UsersManagerType.prototype);
    UsersManager = new UsersManagerType();
});
