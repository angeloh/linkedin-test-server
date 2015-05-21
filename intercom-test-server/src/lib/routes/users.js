/*

 https://doc.intercom.io/api/#user-model


 {
 "type": "user",
 "id": "530370b477ad7120001d",
 "user_id": "25",
 "email": "wash@serenity.io",
 "name": "Hoban Washburne",
 "updated_at": 1392734388,
 "session_count": 0,
 "last_seen_ip" : "1.2.3.4",
 "unsubscribed_from_emails": false,
 "last_request_at": 1397574667,
 "signed_up_at": 1392731331,
 "created_at": 1392734388,
 "updated_at": 1398269574,
 "session_count": 179,
 "user_agent_data": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",
 "pseudonym": null,
 "anonymous": false,
 "custom_attributes": {
 "paid_subscriber" : true,
 "monthly_spend": 155.5,
 "team_mates": 1
 },
 "avatar": {
 "type":"avatar",
 "image_url": "http://example.org/128Wash.jpg"
 },
 "location_data": {
 "type": "location_data",
 "city_name": "Dublin",
 "continent_code": "EU",
 "country_code": "IRL",
 "country_name": "Ireland",
 "latitude": 53.159233,
 "longitude": -6.723,
 "postal_code": null,
 "region_name": "Dublin",
 "timezone": "Europe/Dublin"
 },
 "social_profiles": {
 "type":"social_profile.list",
 "social_profiles": [
 {
 "name": "Twitter",
 "id": "1235d3213",
 "username": "th1sland",
 "url": "http://twitter.com/th1sland"
 }
 ]
 },
 "companies": {
 "type": "company.list",
 "companies": [
 {
 "id" : "530370b477ad7120001e"
 }
 ]
 },
 "segments": {
 "type": "segment.list",
 "segments": [
 {
 "id" : "5310d8e7598c9a0b24000002"
 }
 ]
 },
 "tags": {
 "type": "tag.list",
 "tags": [
 {
 "id": "202"
 }
 ]
 }
 }
 */
Router.map(function() {
    this.route('users', {
        path: 'users',
        where: 'server'
    }).post(function() {
        debugger;

        var response = UsersManager.createUserResponseMethod(this.request);
        sendJSONResponse(this, response);
    }).get(function() {
        var email = this.request.query.email;
        var userId = this.request.query.user_id;
        var response;
        //    path: 'users?user_id=:whalePathUserId',
        debugger;
        if ( userId ) {
            debugger;
            response = UsersManager.getUserByWhalePathUserIdResponseMethod(userId);
        }

        //    path: 'users?email=:email',
        if ( email ) {
            debugger;
            response = UsersManager.getUserByEmailResponseMethod(email);
        }
        sendJSONResponse(this, response);
    });
    this.route('usersByIntercomId', {
        path: 'users/:intercomId',
        where: 'server'
    }).get(function() {
        debugger;
        var response = UsersManager.getUserByIntercomIdResponseMethod(this.request);
        sendJSONResponse(this, response);
    });

});


/*
create user:

 curl https://api.intercom.io/users \
 -X POST \
 -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
 -H 'Accept: application/json' \
 -H 'Content-Type: application/json' -d '
 {
 "user_id": "25",
 "email": "wash@serenity.io",
 "name": "Hoban Washburne",
 "signed_up_at": 1392731331,
 "last_seen_ip" : "1.2.3.4",
 "last_seen_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",
 "custom_attributes": {
 "paid_subscriber" : true,
 "monthly_spend": 155.5,
 "team_mates": 9
 },
 "companies": [
 {
 "company_id" : "366",
 "name" : "Serenity",
 "monthly_spend" : 500
 }
 ]
 }'

 HTTP/1.1 200 OK

 {
 "type": "user",
 "id": "530370b477ad7120001d",
 "user_id": "25",
 "email": "wash@serenity.io",
 "name": "Hoban Washburne",
 "last_request_at": null,
 "created_at": 1392734388,
 "signed_up_at": 1392731331,
 "updated_at": 1392734388,
 "session_count": 0,
 "last_seen_ip" : "1.2.3.4",
 "unsubscribed_from_emails": false,
 "user_agent_data": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",
 "custom_attributes": {
 "paid_subscriber" : true,
 "monthly_spend": 155.5,
 "team_mates": 1
 },
 "avatar": {
 },
 "location_data": {
 },
 "social_profiles": {
 },
 "companies": {
 "type": "company.list",
 "companies": [
 {
 "id" : "530370b477ad7120001e"
 }
 ]
 }
 }

 */


/*
query:

 curl \
 -s https://api.intercom.io/users/5321a20f72cdbb4192000013 \
 -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
 -H 'Accept:application/json'

 HTTP/1.1 200 OK

 {
 "type": "user",
 "id": "530370b477ad7120001d",
 "user_id": "25",
 "email": "wash@serenity.io",
 "name": "Hoban Washburne",
 ...
 }
 # NB: Full User objects are returned
 Example User ID Request
 $ curl \
 -s https://api.intercom.io/users?user_id=25 \
 -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
 -H 'Accept:application/json'
 Example Email Request
 $ curl \
 -s https://api.intercom.io/users?email=wash%40serenity.io \
 -u pi3243fa:da39a3ee5e6b4b0d3255bfef95601890afd80709 \
 -H 'Accept:application/json'


 */