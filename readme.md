# Notes tutorial application

This is tutorial Node.js application showing how to create basic node REST API service with underlying Mongo db and start it in Docker.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Implementation requires Nodejs and Docker.

### Installing

* Clone repository.
* Run npm install (to get all dependencies).
* Run docker-componse up (to create and start containers).

#### Running in dev/test mode

* Dev mode can be run by npm run dev and starts nodejs application directly (not using docker). It requires running Mongo db (either standalone or in docker).
* Test mode (npm test) runs unit tests using Jest framework.

#### Running in docker

Standard run is based on docker containers. In such case 2 containers are started one for application itself, second containing Mongo db. Use docker-compose up --force-recreate to ensure that container is reacreated (if necessary).

### Configurations

Following configurations are part of project:
* env config - connection to Mongo db and exposed port.
* docker-compose.yml - docker configuration file.

## Exposed APIs and example of calls

/notes  
POST method to create new note.  
Example:  
    curl -X POST \
        http://localhost:80/notes \
        -H 'Content-Type: application/json' \
        -H 'cache-control: no-cache' \
        -d '{
	        "title": "First Note",
	        "text" : "This is very first note"
            }'  
/notes  
GET method to retrieve all notes stored in db.  
Example:  
curl -X GET http://localhost:80/notes
