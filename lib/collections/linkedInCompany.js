/**
 * All Company linkedIn information here. So that we are not chasing it all over the place
 * also reduces the duplication.
 *
 * Retrieved from calls to
 *
 * https://developer.linkedin.com/documents/company-lookup-api-and-fields
 *
 * NOTE:
 *
 * 1. all data in this collection is copied from linkedIn. Any data that we will
 * need to preserve because it applies directly to our customers will be copied from
 * this collection to customerAccount objects ( and verified with client ).
 *
 * 2. NOTE: 29 May 2014: At this time, LinkedIn does NOT put any storage time limits on
 * this data.
 *
 * _id : linkedIn assigned Id.
 * @constructor
 */
LinkedInCompany = DbObjectType.createSubClass('linkedInCompany',
    [
        // optional : may not have been selected from a human profile that is doing business with us
        // i.e. past position
        // TODO in future may be multiple accounts ( Panasonic is a big company )
        {'customerAccountId' : { reference: true}},
        // the last time we updated this information via a call using the companies api call,
        // *NOT* from a human's position record (not as much data in the position call)
        // This will allow us to do a HTTP if-modified-since http request.
        // linkedin doesn't mention if they respect this when calling.
        'lastUpdateFromLinkedInAt',
        // if true then the data needs to be refreshed (or retrieved initially from linkedin)
        'checkWithLinkedIn',
        // last time the info was updated from linkedin.
        'lastUpdateFromLinkedInAt',
        'linkedInData',
        // the user that caused this linkedInCompany to be created. Primarily needed so that
        // we have a accessToken to make the call to linkedIn.
        'userId',
        // TODO: clearly mark when linkedin returns a 404 on a company id that linkedin supplied in a user's position.
        'linkedInError'
    ],
    'linkedInCompany');