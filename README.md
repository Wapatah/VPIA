![Release status](https://img.shields.io/badge/release-alpha-blueviolet)
[![Build Status](https://travis-ci.com/Mordax/VPIA.svg?token=9JzkqwDk7NTPWEGwRNt4&branch=master)](https://travis-ci.com/Mordax/VPIA)
## VPIA

This platform uses a modified [Matterwiki](https://github.com/Matterwiki/Matterwiki) as the underlying wiki engine. It uses the MySQL, Express, React and Node (MERN) stack. 

### Instructions for running the VPIA code
1. Install [node](https://nodejs.org/en/)
2. Install [MySQL](https://www.mongodb.com/download-center/community) (make sure you can use MySQL through command line)
3. Navigate to the project folder
4. Install dependencies: `npm install`
5. Run the application: `npm run start`

### Navigating the folders
* `api/` directory contains code for node backend.

* `config/` is the folder where most of the specific configurations should live. This is where webpack is (dev, prod, and middleware for making the debugging process easier.), where Babel is, auth secret, the Caminte database config file and the Eslint configuration file. The WYSIWYG config file is found here too.

* `client/`directory contains the React jsx files and frontend code. Main index.html is here.
    * `client/components/` this folder is where the the React components live. Index.jsx and the routes are standalone here. This is further broken down into subfolders:
        * `client/components/helpers/` Small, reused components. e.g. unique loader for timeout requests and editor preview for the WYSIWYG.
        * `client/components/main/` Overall site components. e.g. About pages, main navigation, header/footer, landing, etc.
        * `client/components/search/` Search-related components. e.g. search components, result pages, filters, etc.
        * `client/components/users/` User management related components. e.g. Login, signup, admin, etc.
        * `client/components/wiki/` Wiki-related components. e.g editing, creating pages, revision history etc.
    * `client/assets/` - Where static files live. style.css is the main VPIA stylesheet. Extra css and js files go here.
        *  `client/assets/fonts` - fonts go here
        *  `client/assets/icons` - SVG files go here
        *  `client/assets/images` - image files go here
    * `client/public` - Built files from webpack are dumped into here

* `models/` Has the database schemas/models. Any change to the structure of tables should be done here.
    * `relations.js` inside this folder defines the relationships between the models. Very simple hasMany, belongsTo relationships. We are using Caminte, a database agnostic ORM (object relational mapping for representing Javascript objects in databases). Caminte uses adapters for various DBs and has a generic approach for defining relationships. Please read more here: <http://www.camintejs.com/>.

### Linting commands
* `npm run lint` - fixes and adheres to javascript design
* `npm run prettier` - Runs the Prettier formatting tool

Eslint is currently not fixing the JSX files in the app folder due to breaking changes and possible lack of backwards compatibility. We should fix this in the future but we must prioritize elsewhere.

We have Travis setup for running builds in Linux, OSX and Windows. It is currently running on only the master branch.

---

## Common Errors
You need to prepare a MySQL DB before running the VPIA. Make sure that the root user credentials you set up align with those in `config/db.js`. Create database based off db.js, feel free to modify this file for your needs. 

> Error:
``` sql
Unhandled rejection Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
> Solution:   

Run this in MySQL - 
``` sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
```
where 'root' is the username you're using for db.js, 'localhost' is the MySQL host and 'password' is your password.

---

## Caminte

Caminte is a database agnostic ORM. However, the tool has been dead the past year. Some of the adapters are not working (for example, ArangoDB). There's still a lot of modification that needs to be done to make sure it's working perfectly. Some of the commands are also depreciated. Switching between Mongo and MySQL works.

We will probably have to fork it, re-publish on NPM in order to make sure we can continue to update it. We'll have to figure out the best way to achieve this. 
