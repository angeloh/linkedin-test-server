Router.map(function () {
    this.route('linkedin_oauth', {
        path: 'uas/oauth2/authorization',
        where: 'server',
        action: function() {
            console.log("hi");
        }
    });
    this.route('linkedin_oauth', {
        path: 'uas/oauth2/accessToken',
        where: 'server',
        action: function() {
            var grantType = this.request.query.grant_type;
            if ( grantType !== 'authorization_code') {
                throw new Meteor.Error(400);
            }
            console.log("hi");
        }
    });


});
