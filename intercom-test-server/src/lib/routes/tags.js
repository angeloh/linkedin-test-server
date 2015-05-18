Router.map(function () {
    // https://doc.intercom.io/api/#list-tags-for-an-app
    this.route('intercom_tags', {
        path: 'tags',
        where: 'server'
    }).get(function () {
        var response = TaggingManager.getTagsResponseMethod(this.request);
        sendJSONResponse(this, response);
            /*
             return
             {
             "type": "tag.list",
             "tags": [
             {
             "type": "tag",
             "name": "Beta User",
             "id": 1
             },
             {
             "type": "tag",
             "name": "Amazing User",
             "id": 2
             },
             {
             "type": "tag",
             "name": "Epic User",
             "id": 3
             }
             ],
             "pages":{}
             }
             */

    }).post(function() {
        var response = TaggingManager.createUpdateTagResponseMethod(this.request);
        sendJSONResponse(this, response);
/*
create:
 {
 "name": "Independent"
 }

 update:
 {
 "id": "17513",
 "name": "Independent"
 }
 */
    });
    this.route('intercom_tags_operation', {
        path: 'tags/:intercomTagId',
        where: 'server'
    }).delete(function () {
        console.log("DELETE");
            // HTTP operation: DELETE, POST, etc.

    });
});

/*
tag response:
 {
 "type": "tag",
 "name": "Independent",
 "id": "17513"
 }
 */