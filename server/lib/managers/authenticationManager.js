Meteor.startup(function() {
    _.extend(AuthenticationManagerType.prototype, {
        createAuthentication: function(authentication, failure) {
            var authentication = new Authentication(authentication);
            if ( !failure) {
                authentication.linkedInResponseAccessToken = _.extend(authentication.linkedInResponseAccessToken || {}, {
                    access_token: 'accesstoken'+Meteor.uuid()
                });
            }
            authentication._save();
        }
    });


    var mongodb = Meteor.require("mongodb"); //or var mongodb = Meteor.require("mongodb") //if you use npm package on atmosphere

    var db = mongodb.Db;
    var mongoclient = mongodb.MongoClient;
    var Server = mongodb.Server;

    var db_connection = new Db('cats', new Server("127.0.0.1", 27017, {auto_reconnect: false, poolSize: 4}), {w:0, native_parser: false});

    db.open(function(err, db) {
        //Connected to db 'cats'

        db.authenticate('<db username>', '<db password>', function(err, result) {
          //Can do queries here
          db.close();
       });
    });
});
