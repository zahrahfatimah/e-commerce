
import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/db/models/product';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const product = await getProductBySlug(slug);
    console.log(product,"<<<< product kamu nihhhhh");
    
    
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
