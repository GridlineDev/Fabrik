import { NextResponse } from 'next/server';
import axios from 'axios';

// Shopify API credentials (store in environment variables in production)
const SHOPIFY_API_URL = `${process.env.SHOPIFY_STORE_URL}`;

export async function GET(request) {
    try {
        // Extract productId from query parameters
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');
        // console.log(productId)

        if (!productId) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }
        // get Product
        const response = await axios.get(`${SHOPIFY_API_URL}/products/${productId}.json`);
        // get Metafield
        const metafieldsData = await axios.get(`${SHOPIFY_API_URL}/products/${productId}/metafields.json`);
        // console.log(metafieldsData.data.metafields)
        const product = response.data?.product || null;
        const metafields = metafieldsData.data.metafields || [];
        return NextResponse.json({ product, metafields }, { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product', details: error.message },
            { status: 500 }
        );
    }
}