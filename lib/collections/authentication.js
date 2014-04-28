Authentication = function() {
    DbObjectType.apply(this, arguments);
}
Meteor.startup(function() {
    DbObjectType.createSubClass(Authentication, 'authentication', [
        ],
        'authentication');
});