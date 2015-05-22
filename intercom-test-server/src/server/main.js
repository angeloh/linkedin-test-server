Intercom = Npm.require('intercom.io')(
    _.extend({},Meteor.getSettings('public.intercom_io'),Meteor.getSettings('intercom_io'))
);