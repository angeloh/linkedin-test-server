/**
 * AuthenticationManager
 */
AuthenticationManager = null;

AuthenticationManagerType = ManagerType.create({
    callPrefix: 'auth',
    meteorCallDefinitions: ['createAuthentication' ],
    primaryDbObjectType: Authentication
});

Meteor.startup(function(){
    Object.freeze(AuthenticationManagerType.prototype);
    AuthenticationManager = new AuthenticationManagerType();
});
