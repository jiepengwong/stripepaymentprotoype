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
        if (res.ok) return res.json()

        // This is for the json response
    }).then(({url}) => {
        window.location = url
    })
})