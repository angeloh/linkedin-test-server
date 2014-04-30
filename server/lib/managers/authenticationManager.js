Meteor.startup(function() {
    _.extend(AuthenticationManagerType.prototype, {
        createAuthentication: function(authentication, failure) {
            var authentication = new Authentication(authentication);
            authentication.linkedInResponseAccessToken = {
                access_token: 'accesstoken'+Meteor.uuid()
            };
            authentication._save();
        }
    });
});
