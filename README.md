[![Coverage Status](https://coveralls.io/repos/github/Ewanjiru/document-management-system/badge.svg?branch=feature%2F%23147202533%2Fcreate-documents-components)](https://coveralls.io/github/Ewanjiru/document-management-system?branch=feature%2F%23147202533%2Fcreate-documents-components)

# **Welcome to eDocz Document System.**

#### Introduction

eDocz is an api consuming system built for the purpose of making document management easier. Through this system, one can be able to perform CRUD opeartions: create,delete,retrieve and update; operations on their private documents and the role documents. 

#### Api Documentation

Find the api documenation below:

   * https://github.com/Ewanjiru/document-management-system/blob/feature/%23147202533/create-documents-components/documentation.apib

#### Development Process

The breakdown of the app building process can be found on pivotal

    * https://www.pivotaltracker.com/n/projects/2041335

#### Installation

For purpose of further development or just inspection you can have the app running in your localhost by:

    *  clonning this repo using git@github.com:Ewanjiru/document-management-system.git
    *  in the root folder, run the command npm install to install all required dependencies
    *  ensure you have postgres installed
    *  create a database using createdb dms_dev
    *  load the migrations using npm run migrate:dev
    *  launch the app using npm start
    *  open the app on your browser on http://localhost:8000

#### First Login

app has pre existing admin with below credentials for login:

    * email: admin@test.com
    * password: Qwerty@1234


#### Deployment

The system is currently deployed on heroku and can be accessed using below link:

    * https://docsystem.herokuapp.com/
