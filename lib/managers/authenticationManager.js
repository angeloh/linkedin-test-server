/**
 * AuthenticationManager
 */
AuthenticationManager = null;

AuthenticationManagerType = function() {
    ManagerType.call( this, 'auth', ['createAuthentication' ] );
    if ( typeof this.ctor == "function") {
        this.ctor.apply(this,arguments);
    }
};
ManagerType.createSubClass(AuthenticationManagerType);

_.extend(AuthenticationManagerType.prototype, {

});
Meteor.startup(function() {
    Object.freeze(AuthenticationManagerType.prototype);
    AuthenticationManager = new AuthenticationManagerType();
    AuthenticationManager.databaseTable = Authentication.databaseTable;
});