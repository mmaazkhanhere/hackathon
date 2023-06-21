'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { urlForImage } from '@/sanity/lib/image'

import { Image as IImage } from 'sanity'

interface Product {
    name: string,
    sub_cat: string,
    image: IImage
    price: number,
    slug?: string
}

const ProductCard: FC<{ item: Product }> = ({ item }) => {
    return (
        <section>
            <Link href={`/product/${item.slug}`} key={item.name}>
                <div className='flex flex-col items-start justify-center hover:scale-110 transition-transform 
                duration-300 p-4 gap-y-[2px]'>
                    <Image src={urlForImage(item.image).url()} alt={item.name} width={400} height={400}
                        className='w-[300px] lg:w-[400px]' />
                    <span className='font-bold font-arimo mt-[2px]'>{item.name}</span>
                    <span className='font-bold tracking-tighter text-gray-500'>
                        {item.sub_cat}
                    </span>
                    <span className='font-bold font-inconsolata'>$ {item.price}.00</span>
                </div>
            </Link>
        </section>
    )
}
export default ProductCard
