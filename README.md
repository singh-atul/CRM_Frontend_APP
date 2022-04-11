# CRM App frontend [ Session 1 ]
## _Learning the development of UI with the calls to RESTful APIs for frontend 

This code base contains logic/structure  for creating User Interface and sending the request to the RESTful APIs to backend

Feature:
* User Registration and User Login
  * CUSTOMER signup is supported from UI
  * ENGINEER signup is supported from UI
  * ADMIN signup is not supported from UI it is supposed to be done directly from backend
  * Once signed up page gets redirected to the login page
  * CUSTOMER can directly login once signed up
  * ENGINEER needs to wait for there status to change from PENDING to APPROVED before signup
  * Once user logs in successfully, there details along with the token will be stored in local storage
  * User will be redirected to the page based upon there role. 


## How is the code organized in this repo ?
The whole repo is divided into multiple branches. Each branch contains code for a specific concept. For example _session1_ has the code base for user registration and login . Each branch is built on the top of the previous branch

## Prerequisite
- Understanding of React.js
- Undestanding of bootstrap
- Undestanding of hooks in react
- Axios


## Tech
- Node.js
- Bootstrap

## Setup
Inorder to setup the application run the following commads
```sh
npx create-react-app crm_frontend
cd crm_frontend/
```
Install the follwing libraries:
```sh
npm i react-router-dom --save
npm i axios --save
npm i react-bootstrap --save
npm i bootstrap --save
```


## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over atulsingh15743@gmail.com

