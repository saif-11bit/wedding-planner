import React, { useState, useEffect } from 'react';


const ScrollToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setShowButton(scrollTop > 100); // Show button after scrolling 100 pixels
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`fixed right-4 bottom-4 bg-gray-800 text-white cursor-pointer rounded-full p-2 z-10 ${
        showButton ? 'visible' : 'invisible'
      }`}
      onClick={scrollToTop}
    >
      Scroll To Top
    </button>
  );
};

export default ScrollToTopButton;
