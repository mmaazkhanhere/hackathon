import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"

export default function Footer() {
    return (
        <>
            <section className=' max-w-[410px] md:max-w-[720px] lg:max-w-[1300px] mx-auto mt-[60px] lg:mt-[150px] 
        grid grid-cols-1 lg:grid-cols-4 px-2 lg:px-0 gap-y-5 lg:gap-y-0'>
                <div className='flex flex-col items-start justify-center gap-y-6 max-w-[250px]'>
                    <div>
                        <Image src="/Logo.webp" alt="Logo Picture" width={150} height={150} />
                    </div>
                    <p className='text-[14px] font-inconsolata'>
                        Small, artisan label that offers a thoughtfully curated collection of high quality everyday
                        essentials made.
                    </p>
                    <div className='flex items-center justify-center gap-x-8'>
                        <div className=' p-2 bg-gray-200 rounded-md cursor-pointer'>
                            <FaFacebookF />
                        </div>
                        <div className=' p-2 bg-gray-200 rounded-md cursor-pointer'>
                            <FaTwitter />
                        </div>
                        <div className=' p-2 bg-gray-200 rounded-md cursor-pointer'>
                            <FaLinkedinIn />
                        </div>
                    </div>
                </div>
                <div className='text-left lg:text-center'>
                    <h1 className='Company font-black text-slate-600'>
                        Company
                    </h1>
                    <ul className='text-[15px] text-gray-500 py-4'>
                        <li className='py-1'>About</li>
                        <li className='py-1'>Terms of Use</li>
                        <li className='py-1'>Privacy Policy</li>
                        <li className='py-1'>How it Works</li>
                        <li className='py-1'>Contact Us</li>
                    </ul>
                </div>
                <div className='text-left lg:text-center'>
                    <h1 className='Company font-black text-slate-600'>
                        Support
                    </h1>
                    <ul className='text-[15px] text-gray-500 py-4'>
                        <li className='py-1'>Support Carrer</li>
                        <li className='py-1'>24h Service</li>
                        <li className='py-1'>Quick Chat</li>
                    </ul>
                </div>
                <div className='text-left lg:text-center'>
                    <h1 className='Company font-black text-slate-600'>
                        Contact
                    </h1>
                    <ul className='text-[15px] text-gray-500 py-4'>
                        <li className='py-1'>WhatsApp</li>
                        <li className='py-1'>Support 24h</li>
                    </ul>
                </div>
            </section>
            <section className='mt-[60px] lg:mt-[150px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-inconsolata 
            text-center border-t-4 items-center justify-center border-black lg:gap-x-[450px] lg:px-0 
            gap-y-4 lg:gap-y- '>
                <div>
                    Copyright <span className='text-[22px]'>&#169; </span>2022 Dine Market
                </div>
                <div>
                    Design by: <span className='font-bold'>Weird Design</span>
                </div>
                <div>
                    Code by:
                    <span className='font-bold'>
                        <Link href="https://github.com/mmaazkhanhere">
                            mmaazkhanhere
                        </Link>
                    </span>
                </div>
            </section>
        </>
    )
}
