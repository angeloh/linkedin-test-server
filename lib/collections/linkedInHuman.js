/**
 * All human linkedIn information here. So that we are not chasing it all over the place.
 *  may or may not be associated with a human.
 *
 * NOTE:
 *
 * 1. all data in this collection is copied from linkedIn. Any data that we will
 * need to preserve because it applies directly to our customers will be copied from
 * this collection to humanConnection/human objects ( and verified with client ).
 *
 * 2. this collection is subject to periodic purging to comply with any linkedIn TOS.
 *
 * _id : linkedIn assigned Id.
 * @constructor
 */
LinkedInHuman = DbObjectType.createSubClass('linkedInHuman',
    [
        // optional : this human may not have account yet ( for example, we have sent an invite to the human on behalf of another researcher).
        {'humanId' : { reference: true}},
        {'userId' : { reference: true}},
        'lastUpdateFromLinkedInAt',
        'checkWithLinkedIn',
        'linkedInData'
    ],
    'linkedInHuman');

Object.defineProperties(LinkedInHuman.prototype, {
    linkedInCompanyIds: {
        'get':function() {
            if ( this.linkedInData.positions && this.linkedInData.positions.values && this.linkedInData.positions.values.length > 0) {
                var linkedInCompanyIds = [];
                for (var i = 0; i < this.linkedInData.positions.values.length; i++) {
                    var position = this.linkedInData.positions.values[i];
                    if (position.linkedInCompanyId) {
                        // not all companies have a company id on linkedIn
                        linkedInCompanyIds.push(position.linkedInCompanyId);
                    }
                }
                return linkedInCompanyIds;
            } else {
                return null;
            }
        }
    }
});
