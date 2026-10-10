import { initGui } from './gui.js';
import { doGet } from './network.js';


function main() {

    initGui();

    doGet({
        action: "getCityData"
    });
}

main();