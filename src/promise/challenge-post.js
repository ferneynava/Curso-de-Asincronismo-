/////  HTTP POST   /////

import fetch from 'node-fetch';
const API = 'https://api.escuelajs.co/api/v1';

function postData(urlAPI, data) {
    const response = fetch(urlAPI, {
        method: 'POST', //En mayúsculas
        mode: 'cors', //cors es el permiso que va a tener, por defecto va estar siempre en cors
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json' // necesario indicar que lo que se está enviando es de tipo json en este caso 
        },
        body: JSON.stringify(data) // el método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON 
    });

    return response;
}

const data = {
    "title": "Microcontrolador PIC16F876A",
    "price": 145,
    "description": "Electronics ",
    "categoryId": 1,
    "images": [
        "https://robots-argentina.com.ar/didactica/imagenes/pic16f876.jpg"
    ]
}

postData(`${API}/products`, data)
    .then(response => response.json())
    .then(data => console.log(data));

