import { NextResponse } from 'next/server';
import axios from 'axios';

const SHOPIFY_API_URL = process.env.SHOPIFY_STORE_URL || '';

const isValidMetafield = (metafield) => {
  return (
    !!metafield &&
    typeof metafield === 'object' &&
    'namespace' in metafield &&
    'key' in metafield &&
    'value' in metafield &&
    'type' in metafield &&
    'productId' in metafield &&
    Object.values(metafield).every((value) => typeof value === 'string' && value.trim() !== '')
  );
};

const getProductMetafields = async (productId) => {
  const response = await axios.get(`${SHOPIFY_API_URL}/products/${productId}/metafields.json`);
  return response.data.metafields || [];
};

const updateMetafield = async (productId, metafieldId, metafield) => {
  return axios.put(`${SHOPIFY_API_URL}/products/${productId}/metafields/${metafieldId}.json`, {
    metafield,
  });
};

const createMetafield = async (productId, metafield) => {
  return axios.post(`${SHOPIFY_API_URL}/products/${productId}/metafields.json`, { metafield });
};

// export async function POST(request) {
//   try {
//     const { metafield } = await request.json();

//     // Validate input
//     if (!isValidMetafield(metafield)) {
//       return NextResponse.json({ error: 'Invalid metafield data' }, { status: 400 });
//     }

//     // Fetch existing metafields
//     const metafields = await getProductMetafields(metafield.productId);
//     const customization = metafields.find(
//       (m) => m.namespace === 'customization' && m.key === 'product_customization'
//     );

//     let response;

//     if (customization) {
//       // Update existing metafield
//       try {
//         JSON.parse(customization.value); // Validate JSON
//         response = await updateMetafield(metafield.productId, customization.id, metafield);
//       } catch (error) {
//         return NextResponse.json({ error: 'Invalid metafield value format' }, { status: 400 });
//       }
//     } else {
//       // Create new metafield
//       response = await createMetafield(metafield.productId, metafield);
//     }

//     // Handle response
//     if (response.status === 200 || response.status === 201) {
//       return NextResponse.json({
//         message: customization ? 'Metafield updated successfully' : 'Metafield created successfully',
//         data: response.data,
//       });
//     }

//     return NextResponse.json(
//       { error: 'Failed to process metafield', data: response.data },
//       { status: 500 }
//     );
//   } catch (error) {
//     const errorMessage =
//       error.response && error.response.data
//         ? error.response.data.error || error.message
//         : 'Internal server error';
//     console.error('Error processing metafield:', error);
//     return NextResponse.json(
//       { error: 'Failed to process metafield', details: errorMessage },
//       { status: 500 }
//     );
//   }
// }
export async function POST(request) {
  try {
    const { metafield } = await request.json();

    // Validate input
    if (!isValidMetafield(metafield)) {
      return NextResponse.json({ error: 'Invalid metafield data' }, { status: 400 });
    }

    // ✅ Fix the JSON value
    let parsedValue;
    try {
      parsedValue = JSON.parse(metafield.value);

      // If `elements` is a string that looks like JSON, parse it
      if (typeof parsedValue.elements === 'string') {
        parsedValue.elements = JSON.parse(parsedValue.elements);
      }

      // Re-assign the corrected value
      metafield.value = JSON.stringify(parsedValue);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON in metafield.value' }, { status: 400 });
    }

    // Fetch existing metafields
    const metafields = await getProductMetafields(metafield.productId);
    const customization = metafields.find(
      (m) => m.namespace === 'customization' && m.key === 'product_customization'
    );

    let response;

    if (customization) {
      // Update existing metafield
      response = await updateMetafield(metafield.productId, customization.id, metafield);
    } else {
      // Create new metafield
      response = await createMetafield(metafield.productId, metafield);
    }

    if (response.status === 200 || response.status === 201) {
      return NextResponse.json({
        message: customization ? 'Metafield updated successfully' : 'Metafield created successfully',
        data: response.data,
      });
    }

    return NextResponse.json(
      { error: 'Failed to process metafield', data: response.data },
      { status: 500 }
    );
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.error || error.message
        : 'Internal server error';
    console.error('Error processing metafield:', error);
    return NextResponse.json(
      { error: 'Failed to process metafield', details: errorMessage },
      { status: 500 }
    );
  }
}
