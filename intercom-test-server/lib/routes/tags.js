Router.map(function () {
    // https://doc.intercom.io/api/#list-tags-for-an-app
    this.route('intercom_get_all_tags', {
        path: 'tags',
        action: function () {
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
        }
    });
    this.route('intercom_tags_operation', {
        path: 'tags/:intercomTagId',
        action: function () {
            // HTTP operation: DELETE, POST, etc.
        }
    });
});