
IntercomTag = DbObjectType.create({
    typeName: 'intercomTag',
    properties: {
        name: {
            indexed: true
        },
        type: {
            defaultValue: "tag",
            secured: true
        }
    },
    databaseTableName:  'intercomTag'
});