/*
 type	string	value is ‘user’
 id	string	The Intercom defined id representing the user
 created_at	timestamp	The time the user was added to Intercom
 signed_up_at	timestamp	The time the user signed up
 updated_at	timestamp	The last time the user was updated
 user_id	string	The user id you have defined for the user
 email	string	The email you have defined for the user
 name	string	The name of the user
 custom_attributes	object	The custom attributes you have set on the user
 last_request_at	timestamp	The time the user last recorded making a request
 session_count	integer	How many sessions the user has recorded
 avatar	object	An avatar object for the user
 unsubscribed_from_emails	boolean	Whether the user is unsubscribed from emails
 location_data	object	A Location Object relating to the user
 user_agent_data	string	Data about the last user agent the user was seen using -
        when sent by client to intercom this is set with 'last_seen_user_agent'
 last_seen_user_agent
 last_seen_ip	no	An ip address (e.g. “1.2.3.4”) representing the last ip address
        the user visited your application from. (Used for updating location_data)
 pseudonym	string	The pseudonym used if this user was previously a contact
 anonymous	boolean	Whether or not this is a contact. Always false
 companies	list	A list of companies for the user
 social_profiles	list	A list of social profiles associated with the user
 segments	list	A list of segments the user
 tags	list	A list of tags associated with the user
 */
IntercomUser = DbObjectType.create({
    typeName: 'intercomUser',
    databaseTableName: 'intercomUser',
    properties: {
        type:{
            defaultValue: 'user',
            secured: true
        },
        created_at: {
            secured: true
        },
        signed_up_at: {
            secured: true
        },
        updated_at: {
            secured:true
        },
        user_id: {
            indexed: true
        },
        email: {
            indexed: true
        },
        name: {
            indexed: true
        },
        custom_attributes: {

        },
        last_request_at: {
            secured: true
        },
        session_count : {

        },
        avatar: {

        },
        unsubscribed_from_emails: {

        },
        location_data: {
            secured: true
        },
        user_agent_data: {
            secured: true
        },
        last_seen_ip: {
        },
        pseudonym: {

        },
        anonymous: {
            secured: true,
            defaultValue: false
        },
        companies: {

        },
        social_profiles: {

        },
        segments: {
            secured: true
        },
        tagIds: {
            secured: true
        }
    }
});