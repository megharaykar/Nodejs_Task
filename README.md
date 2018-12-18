# Nodejs Task
A Node.js application to process Json data

This Application demonstrates dealing with large data from json file. Performing various functionalities like Filtering, Sorting and service side pagination.

## Run the app locally

## Requirements

Node 
Express 
fs

## Getting Started

To get the Node server running locally:

* Clone this repo

* Use your Command Line and navigate to the root folder of your project and enter

```
npm init
```

* npm install to install all required dependencies

```
npm install
```
* Start the node server:

```
node app.js
```
The Application runs on port 3000

Below are the details of the API implemented:

GET: /api/users/ - method to return all the data given in the sample.json file
* If the user reaches this endpoint without any body, it returns the entire contents of the sample.json
* Filter/Pagination/Sorting : The body can contain either zero or any combination of filter, pagination or sorting. Based on the input provided by the user in the body, it returns the results. The input should be in the json with the specified format below.

Example : 

1.{
   "filter":[{"field":"age" : "21"}],
   "pagination":[{"size":10, "page_number": 9}],
   "sort":[{"first_name" : "asc"}]
  }


This application has to be triggered from the command line with CURL or with browser or with applications like Postman.

Below I have included the examples of APIs implemented:







