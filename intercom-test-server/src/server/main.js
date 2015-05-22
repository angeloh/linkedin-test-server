var IntercomNpm = Meteor.npmRequire('intercom.io');
Intercom = new IntercomNpm(
    _.extend({},Meteor.settings.public.intercom_io,Meteor.settings.intercom_io)
);