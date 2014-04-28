Router.map(function () {
    this.route('linkedin_oauth', {
        path: 'uas/oauth2/authorization',
        template: 'login'
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
