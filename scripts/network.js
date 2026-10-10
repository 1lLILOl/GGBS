const url = "https://script.google.com/macros/s/AKfycbwwraiR-aLnuew1Yr_NmHTpE4tySt2nH__kkyPCS7qRHtz0ulhNlBNECq-Lz3yi8BKNbA/exec";


export async function doGet(params) {

    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryParams}`;

    try{

        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`Error in the API ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error trying comunicate with GAS ${error}`);
    }
}



export async function doPost(params) {
    
    try{

        const response = await fetch(url, {

            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(params)
        })

        if (!response.ok) {
            throw new Error(`Error in the API ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error trying comunicate with GAS ${error}`);
    }
}