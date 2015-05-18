sendJSONResponse = function(that, response, statusCode) {
    if ( statusCode == null ) {
        statusCode = 200;
    }
    that.response.writeHeader(statusCode, {"Content-Type": "application/json;charset=UTF-8"});
    that.response.write(EJSON.stringify(response));
    that.response.end();
}