import React from 'react';
import Link from 'next/link';
const Page = () => {
  return (
    <section className='flex items-center justify-center h-screen '>
    <div className='flex flex-col p-10 border border-black rounded-lg shadow-lg gap-4'>
        <input className='border border-black'></input>
        <Link href="/personalize">
        <button className='border border-black'>Sign In</button>
      </Link>
    </div>
    </section>
  );
};

export default Page;