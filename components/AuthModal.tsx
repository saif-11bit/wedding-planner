import useAuthModal from "@/hooks/useAuthModal";
import useAuth from "@/hooks/useAuth";
import Modal from "./Modal";
import axios from "axios";
import { useState } from "react";
import { ChangeEvent } from 'react';
import { AxiosError } from 'axios';


interface LoginResponse {
  // Define the shape of the response data
  access: string;
  refresh: string;
}

const AuthModal = () => {
  const [register, setRegister] = useState(false);
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {isOpen, onClose} = useAuthModal();

  const onChange = (open: boolean) => {
      if (!open) {
          setUsername('');
          setPassword('');
          onClose();
      }
  }

  const handleregister = async () => {
    const response = await axios.post('http://localhost:8000/register/', {
      username,
      email,
      password,
    });
    if (response.status == 201) {
      // alert
      setUsername('');
      setPassword('');
      setEmail('');
      setRegister(false);
      onClose();
    }
  }
  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8000/token/', {
        username,
        password,
      });

      // Extract the tokens from the response
      const { access, refresh } = response.data;
      localStorage.setItem('isLoggedIn', 'true');
      // login();
      // Save the tokens to localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      
      login();
      // Clear input fields
      setUsername('');
      setPassword('');
      
      // Close the modal
      onClose();
      const container = document.getElementById('services');
      const containerTop = container?.offsetTop || 0;
    
      window.scrollTo({
        top: containerTop,
        behavior: 'smooth',
      });
    } catch (error) {
      // Handle error response
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(axiosError.response.data);
      }
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return ( 
    <>
    {register ? (
      <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Welcome"
      description="Register Now"
    >
      <div className="flex gap-4 flex-col justify-center items-center">
          <input
          value={username}
          onChange={handleUsernameChange}
          type="text"
          className="
          flex-1
          bg-transparent 
          border 
          w-full
          border-gray-500 
          px-5 py-1.5
          text-white
          placeholder-gray-500 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Username"
          required
          />
          <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          className="
          flex-1
          bg-transparent 
          border 
          w-full
          border-gray-500 
          px-5 py-1.5
          text-white
          placeholder-gray-500 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Email"
          required
          />
          <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          className="
          flex-1
          bg-transparent 
          border 
          w-full
          border-gray-500 
          px-5 py-1.5
          text-white
          placeholder-gray-500 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Password"
          required
          />
          <button
          onClick={handleregister}
          className="
          w-full
          bg-amber-600
          text-white
          px-4 py-2 
          pl-20 pr-20
          hover:bg-amber-800 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
          "
          >
          Register
          </button>
          <p className="text-neutral-500 mt-12">
              Already have an account?
              <span className="text-white ml-1 hover:underline cursor-pointer">
                  <button onClick={() => {setRegister(false)}}>Register</button>
              </span>
          </p>
      </div>
    </Modal>
    ): (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Welcome Back"
      description="Login to your account"
    >
      <div className="flex gap-4 flex-col justify-center items-center">
          <input
          value={username}
          onChange={handleUsernameChange}
          type="text"
          className="
          flex-1
          bg-transparent 
          border 
          w-full
          border-gray-500 
          px-5 py-1.5
          text-white
          placeholder-gray-500 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Username"
          />
          <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          className="
          flex-1
          bg-transparent 
          border 
          w-full
          border-gray-500 
          px-5 py-1.5
          text-white
          placeholder-gray-500 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500" 
          placeholder="Password"
          />
          <button
          onClick={handleLogin}
          className="
          w-full
          bg-amber-600
          text-white
          px-4 py-2 
          pl-20 pr-20
          hover:bg-amber-800 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
          "
          >
          Login
          </button>
          <p className="text-neutral-500 mt-12">
              First time on wedding planner?
              <span className="text-white ml-1 hover:underline cursor-pointer">
              <button onClick={() => {setRegister(true)}}>Create Account</button>
              </span>
          </p>
      </div>
    </Modal>
    
    )}
    </>
      
    );
}

export default AuthModal;