/**
 * AuthenticationManager
 */
AuthenticationManager = null;

AuthenticationManagerType = ManagerType.createSubClass('auth',
    ['createAuthentication' ],
    null,
    Authentication
);

Meteor.startup(function(){
    Object.freeze(AuthenticationManagerType.prototype);
    AuthenticationManager = new AuthenticationManagerType();
});
