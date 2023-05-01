import fetch from "node-fetch";
const API = 'https://api.escuelajs.co/api/v1';

function putData(urlAPI, data){
    const response = fetch(urlAPI, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

    return response
}

const data = {
    "title": "Microcontrolador PIC16F876A",
    "price": 145,
    "images":[
        "https://robots-argentina.com.ar/didactica/imagenes/pic16f876.jpg"
    ]
}

putData(`${API}/products/208`, data)
.then(response => response.json())
.then(data => console.log(data))
