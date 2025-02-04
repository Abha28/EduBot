import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between mx-10 my-5'>
      <Link href="/home">EduBot</Link>
      <div className='flex flex-row gap-4'>
          
            <Link href="/flashcard">Flash Cards</Link>
            <Link href="/home">chatbot</Link>
      </div>
    </div>
  );
};

export default Navbar;