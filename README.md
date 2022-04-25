# CRM App backend [ Session 2 ]
## _Learning the development of call to RESTful APIs of backend_ 

This code base contains logic/structure  for creating the User Interface for the CRM app

## Features
* User Handling
  * Added OAuth to allow customer to login using third party api
  * OAuth supports login with OAuth2, github and google
  * Once the user is authenticated by the OAuth application, its corresponding account gets created in the crm database
  * Any user logged in using Oauth is set to CUSTOMER



## How is the code organized in this repo ?
The whole repo is divided into multiple branches. Each branch contains code for a specific concept. For example _session1_ has the code base for user registration and login . Each branch is built on the top of the previous branch

## Prerequisite
- Understanding of code in session_1
- Setup made in session_1


## Tech
- React.js
- Bootstrap
  
## Installation
* It is expected that the session_1 is up and running in your 
```sh
cd crm_frontend
npm install query-string @auth0/auth0-react
npm start
```
React application will run on port 3005. You can configure it in .env

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over atulsingh15743@gmail.com

