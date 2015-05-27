sendJSONResponse = function(that, response) {
    if ( response == null ) {
        debugger;
        console.error(that.request.original_url,":undefined response");
        that.response.writeHeader(500, {"Content-Type": "application/json;charset=UTF-8"});
    } else {
        var statusCode;
        var responseBody;
        if ( typeof response === 'string') {
            statusCode = 200;
            responseBody = response;
        } else {
            statusCode = response.statusCode;
            responseBody = JSON.stringify(response.body);

            if (statusCode == null) {
                statusCode = 200;
            }
        }
        that.response.writeHeader(statusCode, {"Content-Type": "application/json;charset=UTF-8"});
        that.response.write(responseBody);
    }
    that.response.end();
}