/**
 * EventsManager
 */
EventsManager = null;

EventsManagerType = ManagerType.create({
    callPrefix: 'intercomEvents',
    meteorCallDefinitions: [
        {
            getTagsResponse: {
                permissionCheck: 'public'
            }
        }
    ]
});

Meteor.startup(function(){
    Object.freeze(EventsManagerType.prototype);
    EventsManager = new EventsManagerType();
});
