import React from 'react'
import ProductCard from '../components/ProductCard'
import { client } from '@/sanity/lib/client'
import { Image as IImage } from 'sanity'

const getAllProduct = async () => {
    const res = await client.fetch(`*[_type == "product"]{
    name,
    sub_cat,
    price,
    product_info,
    image,
    "slug":slug.current,
}`)
    return res;
}

interface IProductType {
    name: string,
    sub_cat: string,
    price: number,
    category: {
        name: string
    },
    image: IImage
}

export default async function AllProducts() {

    const data: IProductType[] = await getAllProduct();

    return (
        <main className=' max-w-[450px] md:max-w-[900px] lg:max-w-[1500px] mx-auto md:mt-12 lg:mt-8 grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[100px] md:p-6 lg:p-0'>
            {
                data.map((item) => (
                    <ProductCard item={item} key={item.name} />
                ))
            }
        </main>
    )
}
