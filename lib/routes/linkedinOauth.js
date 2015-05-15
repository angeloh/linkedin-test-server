Router.map(function () {
    this.route('linkedin_oauth', {
        path: 'uas/oauth2/authorization',
        template: 'login'
    });
    /**
     * "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code" +
     * "&code=" + code +
     * "&redirect_uri=%s" +
     * "&client_id=%s" +
     * "&client_secret=%s"
     */
    this.route('linkedin_oauth_accessToken', {
        path: 'uas/oauth2/accessToken',
        where: 'server',
        action: function() {
            var grantType = this.request.body.grant_type;
            var code = this.request.body.code;
            var redirect_uri = this.request.body.redirect_uri;
            var client_id = this.request.body.client_id;
            var client_secret = this.request.body.client_secret;
            console.log("Attempting access_token exchange");
            if ( grantType !== 'authorization_code') {
                console.log("access_token exchange: grantType !== 'authorization_code'");
                throw new Meteor.Error(400);
            }
            var authentication = AuthenticationManager.findOne({'linkedInResponseSignOn.code':code});
            if ( authentication == null) {
                console.log("access_token exchange: authentication === null");
                throw new Meteor.Error(400, 'missing authentication');
            }
            var response;
            var statusCode = authentication.linkedInResponseAccessToken.statusCode || 200;
            if ( authentication.linkedInResponseAccessToken.timesFail > 0) {
                response = {
                    error: authentication.linkedInResponseAccessToken.error,
                    error_description: authentication.linkedInResponseAccessToken.error_description
                };
                authentication.linkedInResponseAccessToken.timesFail--;
                authentication._save();
            } else {
                response = {
                    access_token: authentication.linkedInResponseAccessToken.access_token,
                    // 60 days from today (in milliseconds).
                    // I know it says 'expires_in' not 'expires_on', but pat sez linkedIn is weird.
                    expires_in: Date.now() + (60 * 24 * 60 * 60 * 1000),
                };
                statusCode = 200;
            }
            this.response.writeHeader(statusCode, {"Content-Type": "application/json;charset=UTF-8"});
            this.response.write(EJSON.stringify(response));
            console.log("access_token exchange: returned status", statusCode);
            this.response.end();
        }
    });
});
