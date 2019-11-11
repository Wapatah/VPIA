[![Build Status](https://travis-ci.com/Mordax/VPIA.svg?token=9JzkqwDk7NTPWEGwRNt4&branch=master)](https://travis-ci.com/Mordax/VPIA)
## VPIA

This platform uses Matterwiki as the underlying wiki engine. This will most likely be heavily customized. We have switched from Bookshelf.js and Knex that Matterwiki uses over to Caminte. And we have managed to switch to MongoDB. 

### Instructions
1. Install [node](https://nodejs.org/en/)
2. Install [MongoDB - Community Edition](https://www.mongodb.com/download-center/community)
2. Navigate to the project folder
3. Install dependencies: `npm install` (if on Windows, you may have to pass the `--force` flag)
4. Run the application: `npm run start`

### Navigating the folders
* `api/` directory contains code for node backend.
TODO: add Matterwiki's api documentation

* `config/` is the folder where most of the specific configurations should live. This is where webpack is (dev, prod, and middleware for making the debugging process easier.), where Babel is, auth secret, the Caminte database config file and the Eslint configuration file. 

* `client/`directory contains the React jsx files and almost all the front end. Main index.html is here.  
    * `client/app/` where the shared resources of the app live such as routes, index, etc.
    * `client/app/components/` is where the specific components live. As this gets more complex, it may be beneficial to move the folders.
    * `client/assets/` - self explanatory. 

* `models/` Has the database schemas/models. Any change to the structure of tables should be done here.
    * `models/relations` defines the relationships between the models. Very simple hasMany, belongsTo relationships. We are using Caminte, a database agnostic ORM (object relational mapping for representing Javascript objects in databases). Caminte uses adapters for various DBs and has a generic approach for defining relationships. Please read more here: http://www.camintejs.com/.

## Tidying up files
* `npm run lint` - fixes and adheres to javascript design
* `npm run prettier` - makes code structure nicer to look at

Eslint is currently not fixing the Jsx files in the app folder due to breaking changes (automatic fix breaks the engine) and possible lack of backwards compatibility. We should fix this in the future but we must prioritize elsewhere.

## Common Errors
MongoDB complaining of depreciation, error with .then(all).

These are directly related to and can be fixed in Caminte. At the moment, we will have to fixure out how to republish the package with the fixes. 

---

Approved fonts:  
* [ ] Baskerville  
* [ ] Futura
* [ ] Univers

Approved Hex colours:  
`Orange-yellow` - #FFA500  
`Red` - #D60812  
`Green-blue` - #208778    
`Blackish` - #0D1319  
`Cool gray` - #75777B  
`Pale grey` - #D0CFCD  

---

## Caminte

Caminte is a database agnostic ORM. However, the tool has been dead the past year. Some of the adapters are not working (for example, ArangoDB). There's still a lot of modification that needs to be done to make sure it's working perfectly. Some of the commands are also depreciated. 

We will probably have to fork it, re-publish on NPM in order to make sure we can continue to update it. We'll have to figure out the best way to achieve this. 
