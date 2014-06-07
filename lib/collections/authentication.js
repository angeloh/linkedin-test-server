Authentication = function() {
    DbObjectType.apply(this, arguments);
}
DbObjectType.createSubClass(Authentication, 'authentication', [
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
    'authentication');
Object.defineProperties(Authentication.prototype, {
    redirectBackUri: {
        'get': function() {
            var redirect = this.redirect_uri+'?state='+this.state;
            _.each(this.linkedInResponseSignOn, function(element, key) {
                redirect = redirect + '&'+ key+'='+element;
            });
            return redirect;
        }
    }
});