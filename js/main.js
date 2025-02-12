const api_Key = '4b1c74254d5d4cb1b6273023241806';
const base_Url = 'https://api.weatherapi.com/v1/forecast.json';
const current =new Date();
// const CurrentDay = 


let country = document.querySelectorAll('#country');
let name = document.querySelectorAll('#name');
let currentDay = document.querySelector('#current-day');
let currentDate = document.querySelector('#current-date');
let currentIcon = document.querySelector('#current-condition-image');
let currentTemp = document.querySelector('#current-temp');
let currentConditionText = document.querySelector('#current-condition-text');
let currentVisKm = document.querySelectorAll('#currentVis_Km')
let currentWindKph = document.querySelectorAll('#currentWind_kph')
let currentWindDir = document.querySelectorAll('#currentWind_dir');

let inputSearch = document.querySelector('#input-search');

let nextDay = document.querySelector('#next-day');
let nextDate = document.querySelector('#next-date');
let nextConditionImage= document.querySelector('#next-condition-image');
let nextTemp = document.querySelector('#next-temp');
let nextConditionText = document.querySelector('#next-condition-image');
// let forecastPressure = document.querySelector('#forecast-pressure');
// let forecastIcon = document.querySelector('#forecast-icon');




async function fetchWeather(location) {
    const response = await fetch(`${base_Url}?key=${api_Key}&q=${location}&days=7&aqi=no&alerts=no`);
    const data = await response.json();
    console.log(data);
    if(data){        
        country.forEach(element => {
            element.innerText = data.location.country; // show the country
        });
        name.forEach(element => {
            element.innerText = data.location.name; //  show the name
        });
        currentVisKm.forEach((element)=>{
            element.innerText = ` ${data.current.vis_km} km`;
        })
        currentWindKph.forEach((element)=>{
            element.innerText = ` ${data.current.wind_kph} kph`;
        })
        currentWindDir.forEach((element)=>{
            element.innerText = ` ${data.current.wind_dir}`;
        })
        inputSearch.value = data.location.name ;

        currentDate.innerText = data.forecast['forecastday'][0].date; // show current date 
        getFormattedDay("#current-day" , current.getDay()) // show current day
        currentIcon.setAttribute("src" , `${data.current.condition.icon}`)
        currentTemp.innerText = `${data.current.temp_c}°C`;
        currentConditionText.innerText = data.current.condition.text;

        // next day 
        nextDate.innerText = data.forecast['forecastday'][1].date;
        let numberOfNextDay = new Date (data.forecast['forecastday'][1].date).getDay(); // select the number of next day 
        getFormattedDay("#next-day" , numberOfNextDay) // show next day
        nextTemp.innerText = `${data.forecast['forecastday'][1].day.avgtemp_c}°C`;
        nextConditionText.innerText = data.forecast['forecastday'][1].day.condition.text;
        nextConditionImage.setAttribute("src" , `${data.forecast['forecastday'][1].day.condition.icon}`);

    }else{
        Swal.fire({
            title: "Enter Valid Country",
            text: "Please, Enter Valid Country.!",
            icon: "error"
          });
    }
}
 
fetchWeather('cairo');


function getFormattedDay( id,numberofday) {
    let element = document.querySelector(id)
    switch (numberofday) {
        case 0:
            element.innerHTML = "Sunday";
            break;
        case 1:
            element.innerHTML = "Monday";
            break;
        case 2:
            element.innerHTML = "Tuesday";
            break;
        case 3:
            element.innerHTML = "Wednesday";
            break;
        case 4:
            element.innerHTML = "Thursday";
            break;
        case 5:
            element.innerHTML = "Friday";
            break;
        case 6:
            element.innerHTML = "Saturday";
            break;
        default:
            element.innerHTML = "Invalid day"; // Handles invalid inputs
            break;
    }
}

function getFormattedDate(current) {
    let day = current.getDate();
    let month = current.getMonth() + 1;
    let year = current.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}/${month}/${year}`;
}

// function in the button 
function getWeather(){
    let inputValue = inputSearch.value;
    if(inputValue){
        fetchWeather(inputValue)
    }else{
        Swal.fire({
            title: "Enter Country",
            text: "Please, Enter Your Country which Your want to know the weather in it.!",
            icon: "error"
        });
    }
    

}

// clear function 
function clearInput(){    
    inputSearch.value = "";
}