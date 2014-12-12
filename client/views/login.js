function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Template.login.helpers({
    profiles: function() {
        var profiles = [];
        for(var p in login_profiles) {
            var profile = login_profiles[p];
            profile.testProfileName = p;
            profiles.push(profile);
        }
        return profiles;
    },
    linkedInHumans: function() {
        var firstName = Session.get('firstName');
        return LinkedInHuman.databaseTable.find({ 'linkedInData.firstName' : firstName }, {sort: {'linkedInData.firstName' : 1}}).fetch();
    },
    profileCount: function() {
        return LinkedInHuman.databaseTable.find().count();
    },
    firstNameFilter: function() {
        return Session.get('firstName');
    }
});

Template.login.events({
    'change #firstNameFilter' : function() {
        var filter = $('#firstNameFilter').val();
        Session.set('firstName', filter);
    },

    'click .login':function() {
        var state = getParameterByName('state');
        var client_id = getParameterByName('client_id');
        // scope=r_basicprofile%20r_emailaddress%20r_contactinfo
        var scope=getParameterByName('scope');

        var profile;
        if (this.testProfileName) {
            profile = login_profiles[this.testProfileName];
        } else {
            profile = this.linkedInData;
            //Needed to revert json structure back to LinkedIn raw format.
            if (profile.positions && profile.positions.values) {
                _.each(profile.positions.values, function(position){
                     if(position.linkedInCompanyId) {
                        position.company = LinkedInCompany.databaseTable.findOneById(position.linkedInCompanyId).linkedInData;
                     }
                });
            }
        }

        var authentication = new Authentication({
            profile: profile,
            client_id: client_id,
            redirect_uri: getParameterByName('redirect_uri'),
            state: state,
            linkedInResponseSignOn: {
                code: 'code_'+state
            }
        });

        AuthenticationManager.createAuthentication(authentication, false);
        window.location = authentication.redirectBackUri;
    },
    'click #user_cancelled':function() {
        var state = getParameterByName('state');
        var client_id = getParameterByName('client_id');
        var authentication = new Authentication({
            client_id: client_id,
            redirect_uri: getParameterByName('redirect_uri'),
            state: state,
            linkedInResponseSignOn: {
                statusCode : 400,
                error: 'invalid',
                error_description: 'the user denied your request'
            }
        });
        AuthenticationManager.createAuthentication(authentication, true);
        window.location = authentication.redirectBackUri;
    },
    //
    'click #server_error':function() {
        var state = getParameterByName('state');
        var client_id = getParameterByName('client_id');
        var timesFail = $("#times").val() ||1;
        var authentication = new Authentication({
            client_id: client_id,
            redirect_uri: getParameterByName('redirect_uri'),
            state: state,
            linkedInResponseSignOn: {
                code: 'code_'+state,
            },
            linkedInResponseAccessToken : {
                statusCode : 500,

                timesFail: timesFail,
                error: 'server_error',
                error_description:"the authorization server encountered an unexpected condition : Unable to retrieve access token"
//                error_description: 'missing required parameters, includes an invalid parameter value, parameter more than once. : Unable to retrieve access token : appId or redirect uri does not match authorization code or authorization code expired',
            }
        });
        // only temporary failure
        AuthenticationManager.createAuthentication(authentication);
        window.location = authentication.redirectBackUri;
    }
});
