import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import fetchProducts from '../../../../lib/fetchProducts';

const MAX_RETRIES = 3;

async function downloadImage(url: string, filepath: string, retries = 0) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    await new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filepath);
      response.data.pipe(stream);
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    console.log(`Downloaded image: ${url}`);
    return filepath;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Retrying download for ${url} (${retries + 1}/${MAX_RETRIES})`,
      );
      return downloadImage(url, filepath, retries + 1);
    } else {
      console.error(
        `Failed to download image after ${MAX_RETRIES} attempts: ${url}`,
      );
      throw error;
    }
  }
}

export async function POST(req: Request) {
  console.log('POST request received');
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'localimages');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    console.log('Fetching products from Shopify');
    const products = await fetchProducts();
    console.log('Products fetched:', products);

    const productsWithLocalImages = await Promise.all(
      products.map(async (product) => {
        const localImages = await Promise.all(
          product.images.map(async (imageUrl, index) => {
            const imagePath = path.join(
              imagesDir,
              `${product.slug}-${index}.jpg`,
            );
            await downloadImage(imageUrl, imagePath);
            return `/localimages/${product.slug}-${index}.jpg`;
          }),
        );
        return {
          ...product,
          images: localImages,
        };
      }),
    );

    const filePath = path.join(process.cwd(), 'public', 'products.json');
    fs.writeFileSync(
      filePath,
      JSON.stringify(productsWithLocalImages, null, 2),
      'utf8',
    );
    console.log('Products and images saved successfully');

    return NextResponse.json(
      { message: 'Products saved successfully!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error saving products:', error);
    return NextResponse.json(
      { message: 'Failed to save products.' },
      { status: 500 },
    );
  }
}
