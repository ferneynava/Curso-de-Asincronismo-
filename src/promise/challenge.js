import fetch from 'node-fetch';
const API = ' https://api.escuelajs.co/api/v1'

function fetchData(urlApi) {
    return fetch(urlApi);
};

// // fetchData(`${API}/products`)
// //     .then(response => response.json()) // Transformar la información del primer llamado con la data que me esta regresando  aun objeto json()
// //     .then(products => {
// //         console.log(products);
// //     })
// //     .then(() => {
// //         console.log('hola');
// //     })
// //     .catch(error => console.log(error));


fetchData(`${API}/products`)
    .then(response => response.json())
    .then(products => {
        console.log(products)
        return fetchData(`${API}/products/${products[0].id}`) // Solo se quiere mostrar el primer elemento de la primera solicitud
    })
    .then(response => response.json()) // Se vuelve a traer la data
    .then(product => {
        console.log(product.title)
        return fetchData(`${API}/categories/${product.category.id}`) // Se quiere mostrar la categoria de un producto en particular
    })
    .then(response => response.json()) // Se vuelve a traer la data
    .then(category => console.log(category.name))
    .catch(error => console.log(error))
    .finally(() => console.log('Finally'))
