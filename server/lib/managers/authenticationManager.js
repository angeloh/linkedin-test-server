Meteor.startup(function() {
    _.extend(AuthenticationManagerType.prototype, {
        createAuthentication: function(authentication, failure) {
            var authentication = new Authentication(authentication);
            if ( !failure) {
                authentication.linkedInResponseAccessToken = _.extend(authentication.linkedInResponseAccessToken || {}, {
                    access_token: 'accesstoken'+Meteor.uuid()
                });
            }
            authentication._save();
        }
    });
});
