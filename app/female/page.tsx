import React from 'react'
import ProductCard from '../components/ProductCard'
import { client } from '@/sanity/lib/client'
import { Image as IImage } from 'sanity'

const getFemaleData = async () => {
    const res = await client.fetch(`*[_type == "product" && category._ref == "c17ab1ae-4d75-4b09-ae1c-109c48fd285d"]{
     name,
    sub_cat,
    price,
    product_info,
    image,
    "slug":slug.current,
}
`)
    return res;
}

interface IProductType {
    name: string,
    sub_cat: string,
    price: number,
    image: IImage,
    product_info: string,
    slug: string
}

export default async function Female() {

    const data: IProductType[] = await getFemaleData();

    return (
        <main className=' max-w-[450px] md:max-w-[900px] lg:max-w-[1500px] mx-auto mt-8 md:mt-12 lg:mt-8 grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[100px]'>
            {
                data.map((item) => (
                    <ProductCard item={item} key={item.name} />
                ))
            }
        </main>
    )
}
