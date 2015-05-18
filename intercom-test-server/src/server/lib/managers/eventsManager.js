Meteor.startup(function() {
    _.extend(EventsManagerType.prototype, {
        eventsCreateUpdateResponseMethod: function(request) {
            var thatManager = this.thatManager;
            thatManager.error("events not implemented.");
            return {};
        }
    });
})