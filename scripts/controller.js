// put the gmt 0 converter here and the measures converter to angle (shadow and stick height)

const sheetsCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSJbhUvOfdYvGA3LUPSMxBTzFTVwVdqwYjY-xrgwW1R6vaP-hqWwuA7fDCiQNmRGwoPvfT5h6vyRCEI/pub?gid=0&single=true&output=csv";
let allPlaces = [];

import { getFromGas, postToGas } from './network.js';


async function initAllPlaces() {

    try {
        
        const response = await fetch(sheetsCSVUrl);
        const csvText = await response.text();

        let lines = csvText.split("\n");
        lines = lines.slice(1);

        allPlaces = lines.map(line => {
            const [id, name] = line.split(",");
            return { 
                id: id?.trim(), 
                name: name?.trim() 
            };
        }).filter(place => place.name);

    } catch (error) {
        console.log(error);
    }
}

function searchPlaces(name) {

    if (!name) return;

    const lowerCaseName = name.toLowerCase();

    const places = allPlaces.filter(place => {
        return place.name.toLowerCase().includes(lowerCaseName);
    }).slice(0, 5);

    return places;
}



function dropdownPlacesTyping(element) {
    
    const searchOptions = document.body.querySelector("#searchOptions");

    const handleInput = debounce( (event) => {

        const inputtedText = event.target.value;
        const places = searchPlaces(inputtedText);
        
        if (!places) return;

        searchOptions.textContent = "";
        

        places.forEach((place) => {
            const name = place.name;
            
            const option = document.createElement("option");
            option.textContent = name;
            option.value = name;
            searchOptions.appendChild(option);
        });

    }, 300);

    element.addEventListener("input", handleInput);
}



// function getDateOnGmt0(gmt, date) {

//     const newDate = new Date(date);
    
//     const gmtNumber = parseInt(gmt, 10);
//     newDate.setHours(date.getHours() - gmtNumber);

//     return newDate;
// }


function getAngleByMeasures(x, y) {

    x = parseInt(x, 10);
    y = parseInt(y, 10);
    if(typeof(x) !== "number" || typeof(y) !== "number") return
    return Math.atan(x/y);
}

function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}



function initSaveData() {

    const saveDataDiv = document.body.querySelector("#saveData");
    const sendBtn = saveDataDiv.querySelector(".sendData");

    const inputEls = saveDataDiv.querySelectorAll("input");

    const placeNameEl = saveDataDiv.querySelector("#placeName");
    const dateEl = saveDataDiv.querySelector("#date");
    const timeEl = saveDataDiv.querySelector("#time");
    // const timezoneEl = saveDataDiv.querySelector("#timezone");
    const shadowLengthEl = saveDataDiv.querySelector("#shadowLength");
    const shadowAngleEl = saveDataDiv.querySelector("#shadowAngle");
    const stickHeightEl = saveDataDiv.querySelector("#stickHeight");
    const northAngleEl = saveDataDiv.querySelector("#northAngle");
    const northProjectionEl = saveDataDiv.querySelector("#northProjection");

    
    dropdownPlacesTyping(placeNameEl);
    // Put a pop up saying theres a error and another telling it was a success
    
    function sendData() {

        if (
            !placeNameEl.value || !dateEl.value || !timeEl.value || 
            !(shadowAngleEl.value || (shadowLengthEl.value && stickHeightEl.value))
        ) return;
        // if (
        //     !placeNameEl.value || !dateEl.value || !timeEl.value || !timezoneEl.value || 
        //     !(shadowAngleEl.value || (shadowLengthEl.value && stickHeightEl.value))
        // ) return;


        const name = placeNameEl.value;


        const timeValueWithSeconds = timeEl.value.split(':').length === 2 ? `${timeEl.value}:00` : timeEl.value;
        const dateInput = new Date(`${dateEl.value}T${timeValueWithSeconds}`);
        const date = dateInput;
        // const date = getDateOnGmt0(timezoneEl.value, dateInput);

        let shadowAngle, northAngle;
        if (typeof(shadowAngleEl.value) === Number) {
            shadowAngle = shadowAngleEl.value;
            northAngle = northAngleEl.value;

        } else {
            shadowAngle = getAngleByMeasures(shadowLengthEl.value, stickHeightEl.value);
            
            if (northProjectionEl) {
                northAngle = getAngleByMeasures(northProjectionEl.value, stickHeightEl.value);
            }

        }

        inputEls.forEach((el => el.value = ""));
        
        const params = {
            action: "updatePlace",
            name: name,
            date: date,
            shadowAngle: shadowAngle,
            northAngle: northAngle,
        }
        const data = postToGas(params);
        console.log(data);
    }

    sendBtn.addEventListener("click", sendData);
    
}

function initMeasureDist() {


}

function initViewData() {


}


export function initController() {

    // initMeasureDist();
    initSaveData();
    // initViewData();

    initAllPlaces();
}