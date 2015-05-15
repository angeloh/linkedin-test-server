Router.map(function () {
    this.route('companies', {
        path: '/v1/companies/:companyIdAndFields',
        where: 'server',
        action: function() {
            var response;
            var companyId = this.params.companyIdAndFields.substring(0, this.params.companyIdAndFields.indexOf(':'));
            var company = company_data[companyId];
            statusCode = 200;
            if (company) {
                response = company;
            } else {
                company = LinkedInCompany.databaseTable.findOneById(companyId);
                if (company) {
                    response = company.linkedInData;
                } else {
                    statusCode = 404;
                    response = { error: "Company is not defined on test server" };
                }
            }
            response = EJSON.stringify(response);
            console.log('company request, id: ' + companyId + '; response: ' + response);
            this.response.writeHeader(statusCode, {"Content-Type": "application/json;charset=UTF-8"});
            this.response.write(response);
        }
    });
});
