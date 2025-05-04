import { NextResponse } from 'next/server';
import axios from 'axios';

async function fetchAllProducts() {
    let allProducts = [];
    let pageInfo = null;
    let hasNextPage = true;

    while (hasNextPage) {
        const url = `${process.env.SHOPIFY_STORE_URL}/products.json?limit=250&fields=id,title,images,metafields${pageInfo ? `&page_info=${pageInfo}` : ''}`;

        const response = await axios.get(url);

        const products = response.data.products || [];
        allProducts = [...allProducts, ...products];

        const linkHeader = response.headers['link'];
        if (linkHeader && linkHeader.includes('rel="next"')) {
            const match = linkHeader.match(/<[^>]*page_info=([^&>]*)[^>]*>; rel="next"/);
            pageInfo = match ? match[1] : null;
        } else {
            hasNextPage = false;
        }
    }

    return allProducts;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    try {
        const allProducts = await fetchAllProducts();

        // If title is provided, filter products
        const filteredProducts = title
            ? allProducts.filter((product) =>
                  product.title.toLowerCase().includes(title.toLowerCase())
              )
            : allProducts;

        return NextResponse.json({ products: filteredProducts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', details: error.message },
            { status: 500 }
        );
    }
}
