var IntercomNpm = Meteor.npmRequire('intercom.io');
Intercom = new IntercomNpm(
    _.extend({},Meteor.settings.public.intercom_io,Meteor.settings.intercom_io)
);
Intercom.syncViewUser = function() {
    var fn = Meteor.wrapAsync(Intercom.viewUser, Intercom);
    var intercomIoData = fn.apply(null, arguments);
    if ( intercomIoData && intercomIoData.id ) {
        intercomIoData._newId = intercomIoData.id;
    }
    return intercomIoData;
};
Intercom.syncGetTag = function() {
    var fn = Meteor.wrapAsync(Intercom.getTag, Intercom);
    var intercomIoData = fn.apply(null, arguments);
    if ( intercomIoData ) {
        _.each(intercomIoData.tags, function(tag, key) {
            intercomIoData.tags[key]._newId = tag.id;
        });
    }
    return intercomIoData;
}