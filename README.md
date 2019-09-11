## VPIA

This platform uses Matterwiki as the underlying wiki engine. This will most likely be heavily customized. Currently using MySQL.

### Navigating the folders
* `api/` directory contains code for node backend. 
TODO: add Matterwiki's api documentation

* `config/` is the folder where most of the specific configurations should live.

* `client/`directory contains the React jsx files and almost all the front end. Main index.html is here.  
    * `client/app/` where the shared resources of the app live such as routes, index, etc. 
    * `client/app/components/` is where the specific components live. As this gets more complex, it may be beneficial to move the folders. 
    * `client/assets/` - self explanatory. This is also where the [trix](https://github.com/basecamp/trix) (wysiwyg editor) code lives. Potentially we can swap it out/modify it to support videos, images, etc.

* `migrations/` are the added schemas to the database. 

* `models/` has the bookshelf database models that work with SQLite and MySQL. TODO: see if Postgres works too and if we can swap it for Mongoose and Mongo if need be.

## Tidying up files
* `npm run lint` - fixes and adheres to javascript design
* `npm run prettier` - makes code structure nicer to look at

Eslint is currently not fixing the Jsx files in the app folder due to breaking changes (automatic fix breaks the engine) and possible lack of backwards compatibility. We should fix this in the future but we must prioritize elsewhere.