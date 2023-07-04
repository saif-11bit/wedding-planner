import React from 'react';
import {AiFillTwitterCircle, AiFillInstagram, AiFillFacebook} from 'react-icons/ai';


const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-4">
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <span className='text-2xl'><AiFillFacebook /></span>
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <span className='text-2xl'><AiFillInstagram /></span>
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className='text-2xl'><AiFillTwitterCircle /></span>
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Wedding Planner</p>
      </div>
    </footer>
  );
};

export default Footer;
