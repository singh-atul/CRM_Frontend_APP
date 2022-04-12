# CRM App backend [ Session 2 ]
## _Learning the development of call to RESTful APIs of backend_ 

This code base contains logic/structure  for creating the User Interface for the CRM app

## Features
* User Handling
  * Navgation bar to display the logo and Logout button
  * Logout Form to clear the local storage and redirect the user back to the login page 
  * Fetch and display the list of all user
  * Filter the user based upon there name, status, type and id
  * Download the fetched user details inform of pdf or csv
  * Update the user detail by clicking on the specific user detail
  * Update of the user will happend using the modal 



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
npm install @material-ui/core @material-table/core @material-table/exporters --save
npm start
```
React application will run on port 3005. You can configure it in .env

## Development

Want to improve? Great!
Make the changes and raise a PR. Reach out to me over atulsingh15743@gmail.com

