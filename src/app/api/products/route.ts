interface ShopifyProductNode {
  id: string;
  title: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  images: {
    edges: Array<{
      node: {
        originalSrc: string;
        altText?: string;
      };
    }>;
  };
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        description?: string;
      };
    }>;
  };
}

interface TransformedProduct {
  id: string;
  slug: string;
  name: string;
  images: string[];
  colors: string[];
  price: string;
  details: string;
  category: string[];
  sizes: string[];
}

interface ShopifyApiResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProductNode;
      }>;
    };
  };
}

const transformProductsData = (
  rawData: ShopifyApiResponse,
): TransformedProduct[] => {
  return rawData.data.products.edges.map(({ node }) => ({
    id: node.id,
    slug: node.title.toLowerCase().replace(/ /g, '-'),
    name: node.title,
    images: node.images.edges.map((edge) => edge.node.originalSrc),
    colors: node.variants.edges
      .map(
        (edge) =>
          edge.node.selectedOptions.find((option) => option.name === 'Color')
            ?.value,
      )
      .filter((color): color is string => color !== undefined),
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    details: node.descriptionHtml,
    category: node.collections.edges.map((edge) => edge.node.title),
    sizes: node.variants.edges
      .map(
        (edge) =>
          edge.node.selectedOptions.find((option) => option.name === 'Size')
            ?.value,
      )
      .filter((size): size is string => size !== undefined),
  }));
};

const fetchProducts = async () => {
  if (
    !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
    !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  ) {
    throw new Error(
      'Required environment variables are not set: Check SHOPIFY_HOST_NAME and SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    );
  }

  const query = `
  {
    products(first: 250) {
      edges {
        node {
          id
          title
          descriptionHtml
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          images(first: 250) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          collections(first: 5) {
            edges {
              node {
                id
                title
                description
              }
            }
          }
        }
      }
    }
  }
  `;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token':
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: query,
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`,
    );
  }

  const json = await res.json();
  return transformProductsData(json);
};

export default fetchProducts;
