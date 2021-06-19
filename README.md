# Weather-Journal App Project

## Author     : Ahmed Gamal 
                                               
## Description: an asynchronous web app that uses Web API and user data to post to server for dynamically update the UI.
                 
## Date       : 19 June 2021 

## HTML and Css Modifications
- setTimeout methode to change background color using javascript
- add three div elements to html file for city name,minimum tempreture and maximum tempreture
- add photo to body background
- change text color in css file
## Error and Information messages
additional using console.log to render the Errors and useful informations
I used alert command to render these:
- Two error messages when user enter (Empty ZipCode field,string ZipCode field )
- TWO information messages (ZipCode not valid when City not found , Cold ot Hot weather)

## Call Stack or code sequence for app.js
- first user click the button generate (add eventlistener)
- then catch the zipCode and feelings entered by user
- and send zipCode to API weather website to obtain on tempreture
- then send this data to server then received this data and update user interface

## There are TWO main parts in my project: 
- Server Side ,you can see  package.json ---> dependencies
 -- First : You are going install these tools  --
    installing express      -->  {npm install express}
	       the express  a useful and simple web framework for Node.js
    installing body-parser  -->  {npm install body-parser}
	       the body Parser is a middle-ware
    installing cors         -->  {npm install express}
           the cors   for public API from cross server
 
 to run the server write to consol command{node server.js}
 
- Cleint Side app.js
first user click button generate (add eventlistener)
then catch the zipCode and feelings entered by user
and send zipCode to API weather website to obtain on tempreture
then send this data to server then received this data and update user interface

# Functions
- isNaN() Function  --> used to check if user enter number or string in zipcode input field
- asyncronous function is a function return a promise 
   and using await and fetch
   -async function chandeFrontEndUser() to update user interface 
   -async function sendToServer(data) to post data TO SERVER
   -async getDataofTemp   to get tempreture info from API website
- try-catch method to monitor the errors if occurs
- AddEvenListener to button Generate
## References
- https://classroom.udacity.com/
- https://openweathermap.org/current#zip
- MDN Web Site
- W3School Web Site 
- https://stackoverflow.com