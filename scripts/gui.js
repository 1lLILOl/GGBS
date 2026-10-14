const activeDiv = document.body.querySelector("#activeDiv");
const renderDiv = document.body.querySelector("#renderDiv");

let sideLeft = false;

function switchSide() {
    
    sideLeft = !sideLeft;

    activeDiv.dataset.side =  sideLeft ? "left" : "right";
    renderDiv.dataset.side =  sideLeft ? "right" : "left";

}

function initSaveDiv() {

    const saveData = document.body.querySelector("#saveData");

    // function addTimezones() {

    //     const timezone = saveData.querySelector("#timezone");

    //     for (let i = -12; i < 13; i++) {

    //         const option = document.createElement("option");
    //         option.value = i;
    //         option.textContent = `GMT ${i}`;

    //         timezone.appendChild(option);
    //     }
    // }

    function enableSwitchingAngleLength() {

        const switchAngleLengthBtn = saveData.querySelector("#switchAngleLength");

        let anglesEnable = false;
        switchAngleLengthBtn.addEventListener("click", () => {

            anglesEnable = !anglesEnable;

            saveData.classList.toggle("showAngles", anglesEnable);
            
            switchAngleLengthBtn.textContent = anglesEnable ? "o" : "x/y";
        });
    }

    function enableAutoFillingToday() {

        const fillNowHere = saveData.querySelector("#fillNowHere");

        const dateEl = saveData.querySelector("#date"); 
        const timeEl = saveData.querySelector("#time"); 

        fillNowHere.addEventListener("click", () => {

            const currentDate = new Date();
            
            const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
            const localISODate = new Date(currentDate.getTime() - timezoneOffset).toISOString();

            dateEl.value = localISODate.split('T')[0]; 
            timeEl.value = localISODate.split('T')[1].slice(0, 5); 
            
        });
    }
    
    // addTimezones();
    enableAutoFillingToday();
    enableSwitchingAngleLength();
    
}


export function initGui() {

    const sectionDivs = document.body.querySelectorAll(".sectionDivs");
    const sectionBtns = document.body.querySelectorAll(".sectionBtns");
    let currentSectionDivId = "saveData";


    sectionBtns.forEach((btn) => {

        const divId = btn.dataset.section;
        const div = document.body.querySelector(`#${divId}`);

        btn.addEventListener("click", () => {

            if (currentSectionDivId === divId) return;

            switchSide();
            sectionDivs.forEach((d) => d.style.display = "none");
            div.style.display = "block";

            currentSectionDivId = divId;
        })
    })


    initSaveDiv();
} 



