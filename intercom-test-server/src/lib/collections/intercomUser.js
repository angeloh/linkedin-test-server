IntercomUser = DbObjectType.create({
    typeName: 'intercomUser',
    properties: {
        name: {
            indexed: true
        },
        type:{
            defaultValue: 'user',
            secured: true
        }
    }
});