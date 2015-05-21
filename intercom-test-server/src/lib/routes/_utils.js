sendJSONResponse = function(that, response) {
    if ( response == null ) {
        debugger;
        console.error(that.request.original_url,":undefined response");
        that.response.writeHeader(500, {"Content-Type": "application/json;charset=UTF-8"});
    } else {
        var statusCode = response.statusCode;
        var responseBody = response.body;
        if (statusCode == null) {
            statusCode = 200;
        }
        that.response.writeHeader(statusCode, {"Content-Type": "application/json;charset=UTF-8"});
        that.response.write(JSON.stringify(responseBody));
    }
    that.response.end();
}