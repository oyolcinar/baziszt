// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { customerAccessToken } = await req.json();

//     if (
//       !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
//       !process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN
//     ) {
//       return NextResponse.json(
//         { error: 'Missing environment variables' },
//         { status: 500 },
//       );
//     }

//     // Fetch customer information using the access token
//     const customerResponse = await fetch(
//       `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/admin/api/2024-01/customers.json`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Access-Token':
//             process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN,
//         },
//       },
//     );

//     const customerData = await customerResponse.json();
//     const customerId = customerData.customer.id;

//     // Fetch orders by customer ID
//     const ordersResponse = await fetch(
//       `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/admin/api/2024-01/orders.json?customer_id=${customerId}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Access-Token':
//             process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN,
//         },
//       },
//     );

//     const ordersData = await ordersResponse.json();

//     return NextResponse.json({ orders: ordersData.orders }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch orders' },
//       { status: 500 },
//     );
//   }
// }
