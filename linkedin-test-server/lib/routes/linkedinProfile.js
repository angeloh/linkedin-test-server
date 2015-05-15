Router.map(function () {
    this.route('linkedin_identity', {
        path: 'v1/people/:fields',
        where: 'server',
        action: function() {
            var fields = this.params.fields;
            console.log("Getting v1/people/"+fields);
            var format = this.request.query.format;
            if ( format != 'json') {
                console.log("did not have query parameter format=json set.");
                throw new Meteor.Error(400, 'Must have format as json');
            }
            var oauth2_access_token = this.request.query.oauth2_access_token;
            var authentication = AuthenticationManager.findOne({
                'linkedInResponseAccessToken.access_token': oauth2_access_token
            });
            if ( authentication == null) {
                console.log("Failed authentication");
                throw new Meteor.Error(400, 'missing authentication');
            }
            if (fields.length > 3) {
                fields = fields.substring(3, fields.length-1).split(',');
                for (var i in fields) {
                    var pos = fields[i].indexOf(';');
                    if (pos > -1) {
                        //Remove ;secured=true field parameters.
                        fields[i] = fields[i].substring(0, pos);
                    }
                    //Convert dash notation to camelCase.
                    fields[i] = fields[i].replace(/-([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });
                }
            } else {
                //No fields specified. Fall back to default response.
                fields = ['firstName', 'headline', 'lastName', 'id'];
            }
            var profile = _.pick(authentication.profile, fields);
            var server = Meteor.absoluteUrl();
            // absoluteUrl() returns 'example.com/', but we want 'example.com'.
            server = server.substring(0, server.length-1);
            var response = _.extend(profile, {
                siteStandardProfileRequest: {
                    url: server + '?id=' + authentication.profile.id + '&' + authentication.state
                }
            });

            this.response.writeHeader(
                authentication.linkedInResponseAccessToken.statusCode
                || 200, {"Content-Type": "application/json;charset=UTF-8"}
            );
            this.response.write(EJSON.stringify(response));
            console.log("returned people info");
            this.response.end();
        }
    });
});