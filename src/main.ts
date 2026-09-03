import './style.css'
import type { Product } from './models/product'
import { getProducts } from './services/productService'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="products">
  <h2>PRACTICA 1</h2>
</section>
`

function renderProducts(products: Product[]): void {
  const valorInventario = products.reduce((total, product) => total + product.precio * product.stock, 0)
  const productosCandidatos = products.filter((product) => product.rating >= 4.5 && product.stock >= 10)

  const productosCategoria = products.reduce<Record<string, number>>((counts, product) => {
    counts[product.categoria] = (counts[product.categoria] ?? 0) + 1
    return counts
  }, {})

  console.log('=== PRODUCTOS CANDIDATOS PARA PROMOCIÓN')
  //PROFE USE EL TABLE PORQUE SE MIRA MAS BONITO QUE EL LOG
  console.table(productosCandidatos.map(({ nombre, precio, rating, stock }) => ({
    nombre: nombre,
    precio: precio,
    rating: rating,
    stock: stock,
  })))


  console.log('=== VALOR TOTAL DEL INVENTARIO ===')
  console.log(`Valor total del inventario: $${valorInventario.toFixed(2)}`)






  console.log('=== REPORTE DE PRECIOS CON DESCUENTO ===')
  console.table(products.map(({ nombre, precio, porcentajeDescuento }) => ({
    producto: nombre,
    precio: precio,
    descuento: `${porcentajeDescuento}%`,
    precioFinal: precio * (1 - porcentajeDescuento / 100),
  })))
  console.log('=== PRODUCTOS POR CATEGORIA ===')
  console.table(productosCategoria)
}

async function loadProducts(): Promise<void> {
  try {
    const products = await getProducts()
    renderProducts(products)
  } catch (error) {
    console.error(error)
  }
}

void loadProducts()
