# TODO Application
It's an application for understand the principal concepts of AngularJS, React, MonogoDB with webpack 3.

## Install MongoDB on Docker

```
docker pull mongo
```

After install mongo, run a container

```
docker exec -it some-mongo mongo admin
use tododb
```

Create a table and a user for the app

```
db.tododb.insert();
db.createUser(
    {   user: 'todo', pwd: 't0d0', 
        roles: [ 
            { role: "readWrite", db: "tododb" } 
        ] 
    });
```

## Run the app

