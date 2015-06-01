var API_VERSION = '1_0';
Router.map(function() {
    this.route('customers', {
        path: '/api/' + 'v' + API_VERSION + '/customers/:identifier',
    }).delete(function() {
        debugger;
        console.log("requesting delete of a customer", this.request);
    });
});
