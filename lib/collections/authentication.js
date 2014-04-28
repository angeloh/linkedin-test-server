Authentication = function() {
    DbObjectType.apply(this, arguments);
}
Meteor.startup(function() {
    DbObjectType.createSubClass(Authentication, 'authentication', [
        'state',
        'code',
        'access_token'
        ],
        'authentication');
});