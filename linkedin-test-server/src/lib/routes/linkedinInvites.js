Router.map(function () {
    this.route('linkedin_invite', {
        path: 'v1/people/~/mailbox',
        action: function() {
            // check oauth_token
            // TODO: when we need to handle.
            debugger;
            console.log("received invite?")
        }
    });
});