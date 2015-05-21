Router.map(function() {
    this.route('/(.*)', {
        path: 'catchall',
        where: 'server',
        action: function () {
            debugger;
        }
    });
});

