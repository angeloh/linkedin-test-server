/**
 * UsersManager
 */
UsersManager = null;

UsersManagerType = ManagerType.create({
    callPrefix: 'intercomUsers',
    meteorCallDefinitions: [
        {
            createUserResponse: {
                permissionCheck: 'public'
            },
            getUserByIntercomIdResponse: {
                permissionCheck: 'public'
            },
            getUserByWhalePathUserIdResponse: {
                permissionCheck: 'public'
            },
            getUserByEmailResponse: {
                permissionCheck: 'public'
            },
        }
    ]
});

Meteor.startup(function(){
    Object.freeze(UsersManagerType.prototype);
    UsersManager = new UsersManagerType();
});
