IntercomUser = DbObjectType.create({
    typeName: 'intercomUser',
    properties: {
        name: {
            indexed: true
        }
    }
});