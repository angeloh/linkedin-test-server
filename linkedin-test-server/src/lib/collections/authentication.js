Authentication = DbObjectType.create({
    typeName: 'authentication',
    properties: [
        'state',
        'redirect_uri',
        'client_id',
        'scope',
        'profile',
        // returned as queryParameters
        'linkedInResponseSignOn',
        // returned as post response
        'linkedInResponseAccessToken'
    ],
    databaseTableName:'authentication',
    privateProperties: {
        redirectBackUri: {
            'get': function() {
                var redirect = this.redirect_uri+'?state='+this.state;
                _.each(this.linkedInResponseSignOn, function(element, key) {
                    redirect = redirect + '&'+ key+'='+element;
                });
                return redirect;
            }
        }
    }
});
