/******************************************************************************/
/*   Author     : Ahmed Gamal                                                 */
/*   Description: app Code for Weather Journal Project                     */
/*   Version    : v 1.0                                                       */
/*   Date       : 28 May 2021                                                 */
/******************************************************************************/

/* Global Variables */
/********Create apiKey from openweather website to get tempreture Fahrenheit degree***/
let apiKey = '&appid=d7f2f263abf551e040a6d1432be4257f&units=imperial';

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
const updateUI = async () => {
    let response = await fetch(`${myServer}all`);  // http://127.0.0.1:5000/all
    try {
        response.json().then(data => {
            /************   change in HTML elements using DOM  *****************/
            document.querySelector("#date").innerHTML = `The Date is : ${data.date}`;
            document.querySelector("#temp").innerHTML = `The Tempreture: ${data.temperature}&degF`;
            document.querySelector("#content").innerHTML = `My Feeling is: ${data.user_response}`;

        })

    } catch (error) {
        console.log('error', error);
    }
};

/*****************************  Function to send data to server     **************************/
async function sendToServer(data) {
    let response = await fetch(`${myServer}add`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    try {
        response.json().then(data => {
            if (response.ok)
                updateUI();
            else
                alert('NOT OK Process');
        })
    } catch (error) {
        console.log('error', error);
    }

}
/***********************    Function to get tempreture data from api  *************************************************************/
const getWeatherInfo = async (zipcode) => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}${apiKey}`)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

/************************** Function to get data (zipcode and his feelings) fron user   ************************************************/
function whenClickGenerate(e) {    //  "function(e)" is the event handling function (on event, object is created).
    const zipCode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;

    if (!zipCode) {                      // check the zipcode field 
        alert("ZipCode is Empty, Please Enter the ZipCode");
        return

    }
    getWeatherInfo(zipCode)
        .then(function (data) {
            // Add data to POST request
            sendToServer({ temperature: data.main.temp, date: newDate, user_response: feelings })
                // Function which updates UI
                .then(function () {
                    updateUI()
                })
        })
}

/*****************************************************************************************/
//****** Event Listener of button Generate using HTML DOM *****/
const myListener = document.getElementById("generate");
myListener.addEventListener("click", whenClickGenerate);