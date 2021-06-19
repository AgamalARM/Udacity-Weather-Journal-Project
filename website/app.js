/******************************************************************************/
/*   Author     : Ahmed Gamal                                                 */
/*   Description: app Code for Weather Journal Project                        */
/*   Version    : v 1.0                                                       */
/*   Date       : 19 Jun 2021                                                 */
/******************************************************************************/
/***
 ***********   Call Stack or code sequence      *******************************
first user click button generate (add eventlistener)
then catch the zipCode and feelings entered by user
and send zipCode to API weather website to obtain on tempreture
then send this data to server then received this data and update user interface
 * ***/

/* Global Variables */
/********Create apiKey from openweather website to get tempreture Fahrenheit degree***/
const myApiKey = '&appid=d7f2f263abf551e040a6d1432be4257f&units=imperial';

/*******set server Absolute  URL to post data*****/
const myServer = "http://127.0.0.1:5000/";

// Create a new date instance dynamically with JS
let date = new Date();
let month = date.getMonth() + 1;  // Must add 1 to manth Because the Month Array begin from Zero
let day = date.getDate();
let year = date.getFullYear();
let newDate = month + '.' + day + '.' + year; // Getting The New Date Dynamically

/***********   Functions Implementation            ******************************/

/*******************  this Function to GET Project Data*****************/
/*******************  and updating UI by this data     *****************/
async function chandeFrontEndUser() {  // update user interface in front end
    let myServerRes = await fetch('/all', {
        credentials: 'same-origin', // at the same server not out side server
    });                             // http://127.0.0.1:5000/all

    try {
        console.log(myServerRes); // to see server response
        myServerRes.json().then(data => {
            /************   change in HTML elements using DOM  *****************/
            document.querySelector("#date").innerHTML = `The Date is : ${data.date}`; // change date
            document.getElementById("city").innerHTML = `The City Name is : ${data.city}`;  // change city name
            document.querySelector("#temp").innerHTML = `The Tempreture: ${data.temperature}&degF`; // change temperature
            document.getElementById("tempMax").innerHTML = `The Max Tempreture: ${data.tempMax}&degF`; // change max temp
            document.getElementById("tempMin").innerHTML = `The Min Tempreture: ${data.tempMin}&degF`; // change min temp
            document.querySelector("#content").innerHTML = `My Feeling is: ${data.feelingsRes_USER}`; // change feelings
            if (data.temperature < 100) { // for example according to your countary weather
                alert("The weather Temperature is COLD,Please wear heavy clothes"); // for example

            } else {
                alert("The weather Temperature is HOT,Please wear light clothes");// for example
            }
        })

    } catch (error) {
        console.log('error', error);  // to handle any error and know it
    }

}
/*****************************  Function to send Information data to server     **************************/
async function sendInfoToServer(userInfo) {
    let response = await fetch('/add', { // using fetch to post request
        method: 'POST',         //POST method because fetch by default is get request method
        credentials: 'same-origin', // end point at the same server
        headers: { 'Content-Type': 'application/json' },// for readable json fromat
        body: JSON.stringify(userInfo)
    });
    try {
        response.json().then(data => {
            while (response.ok) {
                chandeFrontEndUser(); // update user interface in front end
                return
            }
        })
    } catch (error) {
        console.log('error', error); // to handle any error and know it
    }

}
/***********************    Function to get tempreture data from api  *************************************************************/
const getDataofTemp = async (zipcode) => {
    // using fetch to get request
    const apiRes = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}${myApiKey}`)
    console.log(apiRes);
    try {
        const usefulData = await apiRes.json(); // to convert this response to readable data formula
        console.log(usefulData);                // to know what data is returned
        console.log(usefulData.cod);            // to know cod and check healthy of process
        if (usefulData.cod == 404) {     //or Not equal 200 to check if zipcode pointer to city
            alert("The City Not found, Please Enter valid ZipCode");
            return
        } else {
            console.log(usefulData.main.temp);      // to know what temprature is returned
            return usefulData;                      // return this data

        }

    }
    catch (error) {                            // to know what occured Error
        console.log('error', error);          // to handle any error and know it
    }
}

/************************** Function to get data (zipcode and his feelings) fron user   ************************************************/
function whenUserClickButton(evt) {    //  "function(evt)" is the event handling function (on event, object is created).
    console.log(evt);  /*** to see the Mouse Event in console for easy debugging code ***/
    const userZipCode = document.querySelector("#zip").value; // store zip value that user write
    const userFeelings = document.querySelector("#feelings").value; // store feeling value that user write

    while (!userZipCode) {           // check Empty zipcode input  field using while loop
        alert("ZipCode field is Empty, Please Enter the ZipCode"); // Error message alert
        return                            // using return to break a while loop

    }
    if (isNaN(userZipCode)) {  // check if user Enter string in zipcode input field
        alert("You Enter String ,Please Enter a correct ZipCode MUST be a Number");  // Error message alert
        return                            // using return to break if statement

    } else {
        getDataofTemp(userZipCode) // to get temperature from openweathermap api 
            .then(function (data) { // this data replyed from api
                // Add data to POST request to send to server
                sendInfoToServer({ city: data.name, temperature: data.main.temp, tempMax: data.main.temp_max, tempMin: data.main.temp_min, date: newDate, feelingsRes_USER: userFeelings })
            })

    }


}

/*****************************************************************************************/
//****** Event Listener of button Generate using HTML DOM *****/
const myButtonGenerate = document.querySelector("#generate"); // my Generate button in my HTML
console.log("Absolute Server URL " + myServer);
/*********** add animation color activity for body after 1, 2 and 3 seconds *************/
setTimeout(() => {
    document.body.style.backgroundColor = 'red';
}, 1000);
setTimeout(() => {
    document.body.style.backgroundColor = 'green';
}, 2000);
setTimeout(() => {
    document.body.style.backgroundColor = 'orange';
}, 3000);
myButtonGenerate.addEventListener("click", whenUserClickButton);
