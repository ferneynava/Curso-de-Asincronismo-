/* 1. Primero debemos declarar e importar el paquete de XMLHttpRequest,
que nos permite utilizar objetos (XHR) para interactuar con servidores 
(es este caso la API de PLatzi) para esto hacemos:
    const XMLHttpRequest = require('xmlhttprequest'); 

- Lo que hace aquí "require()" es importar el módulo del id que le pasemos,
además puede importar JSON y archivos locales. Pero necesitamos trabajar 
con xmlhttprequest para manipular la API. 

2. Declaramos como constante el url de la API (Obtenemos la referencia al RUT de la API)

    const API = 'https://api.escuelajs.co/api/v1';

3. Ahora es momento de iniciar con la función principal que en términos simples es:

    function fetchData(urlApi, callback){

    }

    - El parámetro 'urlApi' hace referencia a cualquier API con la cúal estemos trabajando, en 
    este caso la FakeStore de Platzi 
    - El segundo parámetro 'callback' es donde posteriormente vamos a pasar una función como argumento 
    para poder controlar el flujo de información de la API. 

4. Necesitamos alguna manera de poder manipular las solicitudes que haremos para consultar los datos, 
para ello vamos a crear un espacio en memoria (una variable) en 
donde guardar el objeto (XHR) que importamos 
y gracias a los métodos ya construidos nos será mil veces más facil desarrollar nuestra función. 

    let xhttp = new XMLHttpRequest();

    - Si estas familiarizado con OOP (Programación orientada a Objetos) sabrás entonces que esto no es
    más que un constructor vacío.

5. Muy bien, ya podemos utilizar nuestra variable 'xhttp' (en conjunto al callback) como un objeto para
acceder y manipular la API. Primero debemos abrir una solicitud (un request) esto lo hacemos con el método .open()

    xhttp.open('GET', urlApi, true)

    - Ahora bien el primer parámetro es el tipo de solicitud que vamos a realizar, pudo haber sido "POST", "PUT", "DELETE". 
    Pero vamos a utilizar "GET". 
    - El segundo parámetro es la url de la API a la cuál le vamos a realizar el request. 
    - Último y tercer parámetro recibe un booleano para indicarle si vamos a utilizar asíncronimo o no, tal siempre como TRUE 
    o FALSE según el caso.
    
6. Vamos a hacer una función anónima para verificar que el request de los datos ha salido con éxito y en caso de tener un error
hacer registro de éste. Para ello nos vamos a apoyar de la propiedad de '.onreadystatechange' éste llamará a la función cada que 
el readyState cambie (readyState retorna el número del estado en donde se encuntra el request).

    xhttp.onreadystatechange =  function (event) {
    }

    - Ahora bien el ciclo de vida del readyState es el siguiente: 
        0 => Se ha inicializado (El cliente ha sido creado. open() aún no ha sido llamado)
        1 => Loading (Cargando) (Se ha llamado a open)
        2 => Se ha cargado (Se ha llamado a send(), y las cabeceras y el estado están disponibles)
        3 => Procesamiento si existe alguna descarga (Descargado; responseText contiene datos parciales)
        4 => Completado (La operación se ha completado)

    if(xhttp.readyState === 4){
    }

    - Una vez completado con éxito necesitamos saber que tipo de respuesta nos entregó el servidor, así 
    que volvemos a verificar con un 'if' la propiedad '.status' según ek tipo de respuestas: 

        1. Respuestas informativas (100 - 199)
        2. Respuestas satisfactorias (200 - 299)
        3. Redirecciones (300 - 399)
        4. Errores de los clientes (400 - 499)
        5. y errores de los servidores (500 - 599)

    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
        } 
    }

    - ¡Ya comprobamos que tanto el request como el response hayan sido exitosos! Ahora podemos invocar nuestro 
    callback (función por definir más tarde para manipular los datos)

    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
            callback(null, JSON.parse(xhttp.responseText));
        } 
    }
        ¿Y por qué tiene tantos parámetros el callback si aún nisquiera lo hemos definido? 🤔 Mira te explico:

        - El primero vamos a utilizarlo en caso de que se presente un error, pero como ya hemos verificado eso 
        podemos simplemente dejarlo como un ‘null’.
        - En el segundo usamos la función ‘JSON.parse()’ para convertir en datos que podamos controlar el texto 
        que nos retorna la propiedad ‘.responseText’ después de hacer el request.

Listo🥳, dejamos preparado nuestro callback sin errores y con la información “traducida” para cualquier 
momento en el que necesitemos usarla. Pero (sep, siempre hay un ‘pero’) ¿Y si el request no es exitoso?
¿Qué va a pasar con nuestra función?😔

    - Hay que regresarnos al primer if y utilizar la estructura de else para que en caso de haber un error registrarlo
    y enviarlo al callback (Donde antes habiamos puesto 'null') y ahora pasar el null en la parte de los datos, ya que nunca 
    pudo consultarlos. 

    -¡¡Acabamos la función!!
    Ya solo resta utilizar el método ‘.send()’ después de procesar los datos para enviar el request al server (API)

*/
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';

function fetchData(urlApi, callback) {
    let xhttp = new XMLHttpRequest(); /*XMLHttpRequest encargado de hacer las peticiones assincronicas lo instancia new. 
    Inicializa un objeto */

    xhttp.open('GET', urlApi, true); // open establecer conexión o prepara la petición
    xhttp.onreadystatechange = function (event) {
        if (xhttp.readyState === 4) { // petición finalizada
            if (xhttp.status === 200) { // documento encontrado, respuesta OK
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error('Error' + urlApi);
                return callback(error, null);
            }
        }
    }

    xhttp.send(); /// Lanza la petición. 
}

/* Se invoca el metodo fetchData() pasandole como argumentos la variable API 
concatenda con la cadena 'products' para acceder a la URL de la API deseada, 
y una funciòn anónima que recibe 2 parámetros (un objeto de error y un arreglo 
que almacena todos los objetos traidos por la API*/

fetchData(`${API}/products`, function (error1, data1) {
    /*Se valida si existe un error, en caso que exista se detiene el proceso y se imprime el error*/
    if (error1) return console.error(error1);
    /*Se invoca nuevamente la función fetchData con el fin de acceder a una objeto puntual del arreglo 
    data1, se envia como paraámetros la url de la API apuntando al atributo del primer objeto de arreglo 
    data1 y nuevamente una función anónima.*/
    fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
        /*Si en este ounto se identifica un error se imprime en consola y se detiene el proceso.*/
        if (error2) return console.error(error2);
        /*Se invoca nuevamente la función fetchData con el fin de acceder a la categoria. se envía 
        como parametros la url de la API con la concatenación de'Categories' y el atributo ID de 'Categories'
        y el atributo Id de categoria del objeto data2 de la función anterior*/

        /*En este caso puntual se hace uso de Optional Chaining el cual hace una evaluación de las 
        propiedades de un objeto y en vez arrojar un error devuelve undefined en caso que la propiedad no exista
        o sea nul.*/

        /*Igual que las anteriores e envia una función anonima con 2 argumentos, un objeto Error y un objeto de datos*/
        fetchData(`${API}/categories/${data2?.category?.id}`, function (error3, data3) {
            /*Se validad si existe error, en caso de que exista se detiene el proceso y se imprime el error */
            if (error3) return console.error(error3);
            /*Se imprime el objeto en posición 1 del arreglo de los objetos obtenidos en el metodo invocado*/
            console.log(data1[0]);
            /*Se imprime el titulo del objeto que se consultó en la segunda invocación de la función*/
            console.log(data2.title);
            /*Se imprime el nombre de la categoria a la que pretenece el objeto que se consultó en la segunda 
            invocación del método.*/
            console.log(data3.name);
        });
    })
})

