const seeder = require('mongoose-seeder')
const mongoose = require('mongoose')
const role = require('./models/role')

// connexion de mongodb
const data = [
    {
        'model':'role',
        'documents':[
            {
                "name":"user",
                "description":"simple utilisateur"
            },
            {
                "name":"admin",
                "description":"simple administrateur"
            },
            {
                "name":"sup_admin",
                "description":"super administrateur"
            }
        ]
    }
]

const db = "mongodb://localhost/Messenger_cmr";

seeder.seed(data, {dropCollections: true}).then(function(db) {
    // The database objects are stored in dbData
}).catch(function(err) {
    // handle error
});

