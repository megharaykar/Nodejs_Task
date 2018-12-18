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

GET /api/users/ - method to return all the data given in the sample.json file (The reason for using GET over POST method is that, all the functionalities are retrieving data and not writing data into a datastore)
* If the user reaches this endpoint without any request body, it returns the entire contents of the sample.json
* Filter/Pagination/Sorting : The request body can contain either zero or any combination of filter, pagination or sorting. Based on the input provided by the user in the request body, it returns the results. The input should be in the json with the specified format below.

## Scenario1 :
Input: With No request Body
     GET  localhost:3000/api/users/ 
       
Output: 
Returns the entire json contents

## Scenario2:
Input: With request body (an example as shown below)
         GET localhost:3000/api/users/
       
{
"filter":[
   {"field": "age", "operator": "EQUALS", "value": 21}
   ],
 "sort":[
	{"first_name": "asc"}
  ],
  "pagination" : {
	"size" : 5,
	"page_number" : 1
  }
}

Output: 
The above example input filters all those values with age equal to 21, then it is sorted in ascending order of first_name and then the pagination of size 5 and page_number 1 is applied.

returns status 200ok with the appropriate json content.


## method to add a new record to the json file

POST /api/users/ 

{
        "id": 1001,
        "first_name": "Megha",
        "last_name": "Raykar",
        "email": "megharaykar@gmail.com",
        "gender": "Female",
        "age": 24
}

Output: 
returns status 200ok

This application has to be triggered from the command line with CURL or with browser or with applications like Postman.







