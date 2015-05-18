IntercomNote = DbObjectType.create({
    typeName: 'intercomNote',
    properties: {
        type:{
            defaultValue: 'note',
            secured: true
        }
    },
    databaseTableName: 'intercomNote',
});