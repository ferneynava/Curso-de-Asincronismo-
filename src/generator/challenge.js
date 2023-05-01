import fetch from 'node-fetch'
const API = 'https://api.escuelajs.co/api/v1'

async function fecthData(urlApi) {
    const response = await fetch(urlApi)
    const data = await response.json()
    return data
}

async function* anotherFunction(urlApi) {
    const products = await fecthData(`${urlApi}/products`)
    yield products
    const product = await fecthData(`${urlApi}/products/${products[0].id}`)
    yield product.title
    const category = await fecthData(`${urlApi}/categories/${product.category.id}`)
    yield category.name
}

const datas = anotherFunction(API)
console.log(await datas.next())
console.log(await datas.next())
console.log(await datas.next())


