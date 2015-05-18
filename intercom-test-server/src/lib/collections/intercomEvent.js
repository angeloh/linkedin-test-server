IntercomEvent = DbObjectType.create({
    typeName: 'intercomEvent',
    properties: {
        type:{
            defaultValue: 'event',
            secured: true
        }
    }
});