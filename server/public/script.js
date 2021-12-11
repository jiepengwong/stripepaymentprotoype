const button = document.querySelector("button");
button.addEventListener("click",()=>{

    // Fetch request to the server, creation of an endpoint
    fetch('/create-checkout-session', {
        method: "POST",
        headers:{
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            items:[
                {id: 1, quantity: 3}, 
                {id:2, quantity:1}
            ]
        })
          
    }).then(res=>{
        // Check good response
        if (res.ok) return res.json()
        // If response is bad 
        console.log("help")

        return res.json().then(json => Promise.reject(json))

        // This is for the json response, which would return a URL 
    }).then(({url}) => {
        console.log(url);
        window.location = url
        //The window.location object can be used to get the current page address (URL) and to redirect the browser to a new page.


    }).catch(e =>{
        console.log(e.error)
    })
})