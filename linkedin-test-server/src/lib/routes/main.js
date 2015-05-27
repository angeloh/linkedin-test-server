Router.map(function() {
    this.route('catchall', {
        path: '/(.*)',
        where: 'server',
        action: function () {
            this.response.writeHeader(200, {"Content-Type": "application/json;charset=UTF-8"});
            this.response.write("LinkedIn test server");
            this.response.end();
        }
    });
});

