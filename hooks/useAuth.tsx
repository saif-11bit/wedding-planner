// useAuth.ts
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking tokens in local storage)
    // const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');
    const logged = localStorage.getItem("isLoggedIn");
    console.log(logged)
    if (!logged || logged=="false") {
        setIsLoggedIn(false)
    } else {
        setIsLoggedIn(true)
    }
  }, []);
  
  return isLoggedIn;
};

export default useAuth;