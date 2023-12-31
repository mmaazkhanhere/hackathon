import { client } from '../lib/sanityClient';
import { Image as IImage } from 'sanity'

interface IProduct {
  name: string,
  sub_cat: string,
  price: number,
  image: IImage,
  product_info: string,
  quantity: number,
}


export const getProduct = async (slug: string): Promise<IProduct> => {
  try {
    const query = `*[_type=="product"&& slug.current=="${slug}"]{
    name,
    price,
    image,
    sub_cat,
    product_info,
    quantity
}`;

    // Fetch data using the query
    const data = await client.fetch<IProduct[]>(query, { slug });

    // Return the fetched data
    return data[0];
  } catch (error) { throw new Error('Cannot fetch product') }
};