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
const renderDiv = document.body.querySelector("#renderDiv");

let sideLeft = false;

function switchSide() {
    
    sideLeft = !sideLeft;

    const sideData = sideDataIsMobile[isMobile.matches];

    const normalAnimation = `${sideData["Animation"]} 0.35s ease-in-out forwards`;
    const reverseAnimation = `${sideData["Animation"]} 0.35s ease-in-out reverse forwards`;



    activeDiv.style.animation = "none";
    renderDiv.style.animation = "none";

    void activeDiv.offsetWidth;
    void renderDiv.offsetWidth;

    if (sideLeft) {
        
        activeDiv.style.animation = normalAnimation;
        renderDiv.style.animation = reverseAnimation;

    }else{

        activeDiv.style.animation = reverseAnimation;
        renderDiv.style.animation = normalAnimation;
    }

}


window.addEventListener('resize', () => {
  
    activeDiv.style.animation = "none";
    renderDiv.style.animation = "none";

    void activeDiv.offsetWidth;
    void renderDiv.offsetWidth;
    

});




export function initGui() {

    const sectionDivs = document.body.querySelectorAll(".sectionDivs");
    const sectionBtns = document.body.querySelectorAll(".sectionBtns");
    let currentSectionDiv = "saveData";


    function disableAllSections() {

        for (let i = 0; i < sectionDivs.length; i++ ){

            console.log(sectionDivs[i]);
            sectionDivs[i].style.display = "none";
        }

    }


    for (let i = 0; i < sectionBtns.length; i++ ){

        const sectionBtn = sectionBtns[i];
        const sectionDivId = sectionBtn.dataset.section;
        const sectionDiv = document.body.querySelector(`#${sectionDivId}`);
        

        sectionBtn.addEventListener("click", () => {

            if (currentSectionDiv === sectionDivId) return;

            switchSide();
            disableAllSections();

            sectionDiv.style.display = "block";

            currentSectionDiv = sectionDivId;
            
        });
    }
} 



