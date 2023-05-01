import fetch from "node-fetch";
const API = 'https://api.escuelajs.co/api/v1'

function deleteData(urlAPI){
    const response = fetch(urlAPI, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
    })
    return response
}

deleteData(`${API}/products/208`)
.then(response => response.json())
.then(data => console.log(data))