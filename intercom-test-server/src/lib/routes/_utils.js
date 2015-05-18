sendJSONResponse = function(that, response) {
    var statusCode = response.statusCode;
    var responseBody = response.body;
    if ( statusCode == null ) {
        statusCode = 200;
    }
    that.response.writeHeader(statusCode, {"Content-Type": "application/json;charset=UTF-8"});
    that.response.write(JSON.stringify(responseBody));
    that.response.end();
}