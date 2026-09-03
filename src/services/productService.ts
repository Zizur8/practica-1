

import type { Product } from '../models/product';

const API = 'https://dummyjson.com/products/';

interface ApiProduct {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
}

interface ApiProductsResponse {
	products: ApiProduct[];
	total: number;
	skip: number;
	limit: number;
}

export async function getProducts(): Promise<Product[]> {
	const response = await fetch(API);

	if (!response.ok) {
		throw new Error(`Error en buscar catalogo (${response.status})`);
	}

	const data: ApiProductsResponse = await response.json();
	return data.products.map((product) => ({
		id: product.id,
		nombre: product.title,
		descripcion: product.description,
		categoria: product.category,
		precio: product.price,
		porcentajeDescuento: product.discountPercentage,
		rating: product.rating,
		stock: product.stock,
	}));
}
