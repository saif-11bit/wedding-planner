import useAuthModal from "@/hooks/useAuthModal";
import Footer from "./Footer";
import ServiceList from "./ServiceList";
import axios from "axios";
import { AxiosError } from 'axios';
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

interface SubService {
  id: number;
  sub_service_name: string;
  starting_price: number;
}

interface Location {
  id: number;
}

interface ServicesResponse {
  id: number;
  sub_services: SubService[];
  service_name: string;
  image_url: string;
  about: string;
  locations: Location[];
}

const Landing = () => {
  const loggedIn = useAuth();
  const [services, setServices] = useState<ServicesResponse[]>([]);
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  
    const container = document.getElementById('services');
    const containerTop = container?.offsetTop || 0;
  
    window.scrollTo({
      top: containerTop,
      behavior: 'smooth',
    });
  };
  const authModal = useAuthModal();


  useEffect(() => {
    // Fetch services using Axios inside the useEffect hook
    axios.get<ServicesResponse[]>('http://localhost:8000/services/')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        // Handle the error appropriately if needed
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Rest of your component code...

  // Render conditionally based on the availability of the data
  if (services.length === 0) {
    return <div>Loading...</div>; // or any other loading indicator
  }
  return ( 
    <div className="relative h-full w-full bg-[url('/images/couple.jpg')] bg-no-repeat bg-center bg-fixed bg-cover bg-zinc-900">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="flex justify-between px-12 py-5">
          <div className="text-white font-bold text-xl">My Logo</div>
          <div className="text-black font-semibold cursor-pointer bg-amber-400 rounded-full p-3">
          {loggedIn ? (
            <a href="#">
              Logout
            </a>
          ) : (
            <a href="#" onClick={authModal.onOpen}>
              Login
            </a>
          )}

          </div>
        </nav>
        <div className=" h-5/6 flex flex-col items-center justify-center gap-4">
          <div className="font-semibold text-3xl text-white">
          The Poetry of Love
          </div>
          <div className=" font-thin text-xl text-gray-100">
          Start your journey to perfect wedding!
          </div>
          <div>
          <a 
            className="bg-transparent border border-white-500 px-5 py-2 text-white hover:bg-amber-600 hover:text-white transition-colors duration-300"
            // disabled={false}
            type={"button"}
            onClick={scrollToSection}
          >
            ENTER →
          </a>
          </div>
        </div>
      </div>
      <ServiceList services={services} />
      <Footer />
    </div>
  );
}
 
export default Landing;