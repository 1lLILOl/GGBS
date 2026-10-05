const isMobile = window.matchMedia("(max-width: 768px)");

const sideDataIsMobile = {

    [true]: {

        ["Animation"]: "activeDivToTop",
        
    },
    [false]: {

        ["Animation"]: "activeDivToLeft"
    }

}



const activeDiv = document.body.querySelector("#activeDiv");
const backgroundImgs = document.body.querySelector("#backgroundImgs");

let sideLeft = false;

function switchSide() {
    
    sideLeft = !sideLeft;

    const sideData = sideDataIsMobile[isMobile.matches];

    const normalAnimation = `${sideData["Animation"]} 0.35s ease-in-out forwards`;
    const reverseAnimation = `${sideData["Animation"]} 0.35s ease-in-out reverse forwards`;




    activeDiv.style.animation = "none";
    backgroundImgs.style.animation = "none";

    void activeDiv.offsetWidth;
    void backgroundImgs.offsetWidth;

    if (sideLeft) {
        
        activeDiv.style.animation = normalAnimation;
        backgroundImgs.style.animation = reverseAnimation;

    }else{

        activeDiv.style.animation = reverseAnimation;
        backgroundImgs.style.animation = normalAnimation;
    }

}


const openSaveSection = document.body.querySelector("#openSaveSection");
const openDistanceMeasureSection = document.body.querySelector("#openDistanceMeasureSection");

const saveData = document.body.querySelector("#saveData");
const measureDist = document.body.querySelector("#measureDist");

openSaveSection.addEventListener("click", () => {

    saveData.style.display = "block";
    measureDist.style.display = "none";

    switchSide();
});

openDistanceMeasureSection.addEventListener("click", () => {

    measureDist.style.display = "block";
    saveData.style.display = "none";

    switchSide();
});