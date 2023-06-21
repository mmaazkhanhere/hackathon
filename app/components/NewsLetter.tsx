import React from 'react'

export default function NewsLetter() {
    return (
        <section className='relative mt-[60px] lg:mt-[150px] max-w-[450px] md:max-w-[900px] lg:max-w-[1500px] mx-auto
      px-4 '>
            <div className='absolute font-black font-inconsolata opacity-10 text-[65px] md:text-[85px] lg:text-[92px] 
        md:left-[18%] lg:left-[32%]'>
                Newsletter
            </div>
            <div className='flex flex-col gap-y-3 lg:gap-y-6'>
                <h1 className='font-bold font-arimo tracking-[1px] text-3xl text-center'>Subscribe Our Newsletter</h1>
                <p className='text-[16px] font-inconsolata text-center'>
                    Get the latest information and promo offers directly
                </p>
                <div className='flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-4'>
                    <div>
                        <input type="emial" placeholder='Input email address' className='px-4 border font-inconsolata py-2 
              text-[14px] w-[300px]' />
                    </div>
                    <div>
                        <button className='px-8 md:px-6 lg:px-4 py-2 text-white bg-black font-arimo'>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
