function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Template.login.events({
    'click #login':function() {
        var state = getParameterByName('state');
        var client_id = getParameterByName('client_id');
        // scope=r_basicprofile%20r_emailaddress%20r_contactinfo
        var scope=getParameterByName('scope');
        var authentication = new Authentication({
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