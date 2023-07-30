// pages/[serviceId].tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {ImLocation} from "react-icons/im";
import {GetServerSideProps} from "next";
import axios from 'axios';
import jwt from "jsonwebtoken";
import { ChangeEvent } from 'react';
import useServiceModal from '@/hooks/userServiceModal';
import ServiceModalProvider from "@/providers/ServiceModalProvider";


interface SubService {
  id: number;
  sub_service_name: string;
  starting_price: number;
}

interface Review {
  id: number;
  service: number;
  username: number;
  stars: number;
  message: string;
}

interface Location {
  id: number;
  loc: string;
}

interface Service {
  id: number;
  sub_services: SubService[];
  service_name: string;
  image_url: string;
  about: string;
  locations: Location[];
}

interface ServiceDetailsResponse {
  service: Service;
  reviews: Review[];
  locations: Location[];
}

interface ServiceDetailsProps {
  serviceDetails: ServiceDetailsResponse;
}


const ServiceDetailPage: React.FC<ServiceDetailsProps> = ({ serviceDetails }) => {

  const serviceModal =useServiceModal();
  console.log(serviceModal)
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState<number | null>(null);
  const router = useRouter();
  const { serviceId } = router.query;
  const [activeTab, setActiveTab] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [contmessage, setContmessage] = useState('');

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handleConMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContmessage(e.target.value);
  };

  const sendMessage = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from localStorage
    if (!accessToken) {
      // Handle the case when the access token is not available
      console.error('Access token not found');
      return;
    }
    const decodedToken = jwt.decode(accessToken);
    if (decodedToken) {
      const userId = decodedToken.user_id;
      if (!userId) {
        console.error('Invalid access token!');
        return;
      }
      setUserId(userId);
    }
    const apiUrl = `http://localhost:8000/message/`; // Replace with the actual API URL
    console.log(accessToken)
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      user_id: userId,
      reason: reason,
      message: contmessage
    };

    const response = await axios.post(apiUrl, data, { headers });
    console.log('Message sent successfully:', response.data);
  }

  // Add review
  const addReview = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Get the access token from localStorage
      if (!accessToken) {
        // Handle the case when the access token is not available
        console.error('Access token not found');
        return;
      }
      const decodedToken = jwt.decode(accessToken);
      if (decodedToken) {
        const userId = decodedToken.user_id;
        if (!userId) {
          console.error('Invalid access token!');
          return;
        }
        setUserId(userId);
      }
      const apiUrl = `http://localhost:8000/services/${serviceId}/reviews/`; // Replace with the actual API URL
      console.log(accessToken)
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
  
      const data = {
        user_id: userId,
        stars: stars,
        message: message
      };
  
      const response = await axios.post(apiUrl, data, { headers });
  
      console.log('Review added successfully:', response.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };


  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };


  return (
    <>
    <ServiceModalProvider />
    
    <div className="flex p-10 bg-zinc-900">
      {/* LEFT */}
      <div className="w-2/3">
        <div className="border rounded overflow-hidden shadow-lg mr-5 bg-neutral-800 border-neutral-700 p-4 mb-5">
          <div className="px-6 py-4">
            <div className="relative inline-block">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
              <img
                src={serviceDetails.service.image_url}
                alt="Card Image"
                className="w-100 h-375"
              />
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-3/4 h-8">
                <div className="text-4xl p-5 bg-transparent text-white font-bold">{serviceDetails.service.service_name}</div>
                {/* <p className="text-base p-5 bg-transparent text-white">description...</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded overflow-hidden shadow-lg mr-5 bg-neutral-800 border-neutral-700 p-4 mb-5">
          <div className="flex justify-around text-white">
            <div
              className={`py-2 px-4 cursor-pointer ${
                activeTab === 1 ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => handleTabClick(1)}
            >
              Projects
            </div>
            <div
              className={`py-2 px-4 cursor-pointer ${
                activeTab === 2 ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => handleTabClick(2)}
            >
              About
            </div>
            <div
              className={`py-2 px-4 cursor-pointer ${
                activeTab === 3 ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => handleTabClick(3)}
            >
              Reviews
            </div>
          </div>
        </div>
        <div className="text-white border rounded overflow-hidden shadow-lg mr-5 bg-neutral-800 border-neutral-700 p-4 mb-5">
          {activeTab === 1 && (
            <div className="grid grid-cols-4 grid-rows-4 gap-4 w-800 mx-auto p-16">
            {Array.from({ length: 16 }, (_, index) => (
              <div key={index}>
                <img src={`https://shorturl.at/clvZ1`} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
          )}
          {activeTab === 2 && <div>
            {serviceDetails.service.about}
            </div>
          }
          {activeTab === 3 && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>


              <div className="flex gap-4 flex-col justify-center items-center pt-4">
              <div className='flex'>
                {Array.from({ length: 5 }, (_, index) => (
                  <AiFillStar
                    key={index}
                    size={30}
                    color={index < stars! ? 'yellow' : 'gray'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setStars(index + 1)}
                  />
                ))}
              </div>
              <textarea
              value={message}
              onChange={handleMessageChange}
              className="
              flex-1
              bg-transparent 
              border 
              w-3/4
              border-gray-500 
              px-5 py-1.5
              text-white
              placeholder-gray-500 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500" 
              placeholder="Review"
              ></textarea>
              <button
              onClick={addReview}
              className="
              w-3/4
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
              Add Review
              </button>
            </div>
              {serviceDetails.reviews.map((review) => (
                <div key={review.id} className="mt-4 border-b border-gray-40">
                  <div className='flex gap-3 p-2'>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src="https://shorturl.at/ekoIY" />
                      </div>
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold">{review.username}</h3>
                      <div className="flex items-center">
                        {Array.from({ length: review.stars }, (_, index) => (
                          <AiFillStar color='yellow'/>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='p-3'>{review.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-1/3">
        <div className="border rounded overflow-hidden shadow-lg bg-neutral-800 border-neutral-700 p-4 mb-5">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-amber-600">{serviceDetails.service.service_name}</div>
            <div className='text-white flex items-center gap-1'>
              {serviceDetails.locations.map((loc) => (
                <>
                <span><ImLocation color='white'/></span>
                <span>{loc.loc}</span>
                </>
              ))}
            </div>
          </div>
        </div>
        {/* PRICING */}
        <div className="border rounded overflow-hidden shadow-lg bg-neutral-800 border-neutral-700 p-4 mb-5">
          <div className="px-6 py-4">
            <div className='flex justify-between items-center'>
              <div className="font-bold text-xl mb-2 text-white">Starting Price</div>
              <div className="mb-2 text-white">Pricing Info</div>
            </div>
            {serviceDetails.service.sub_services.map((sub) => (
              <div className='flex justify-between items-center'>
                <div className="mb-2 text-white">{sub.sub_service_name}</div>
                <div className="mb-2 text-white">₹{sub.starting_price}</div>
              </div>              
            ))}
            <div>
            {/* onClick={() => generatePDF(selectedServices)} */}
              {/* <SelectedServices selectedServices={selectedServices} /> */}
              <button onClick={serviceModal.onOpen} className='p-4 text-white border bg-transparent w-full mt-2 hover:bg-amber-600'>Get Free Quotation</button>
            </div>
          </div>
        </div>
        {/* Contact Us */}
        <div className="border rounded overflow-hidden shadow-lg bg-neutral-800 border-neutral-700 p-4 mb-5">
          <div className="px-6 py-4">
          <div className="mb-2 text-white text-xl font-bold pb-1">Send Message</div>
          <div className="flex gap-4 flex-col justify-center items-center">
            <input
            value={reason}
            onChange={handleReasonChange}
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
            placeholder="Reason"
            />
            <textarea
            value={contmessage}
            onChange={handleConMessageChange}
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
            placeholder="Message"
            ></textarea>
            <button
            onClick={sendMessage}
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
            Send Message
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServiceDetailPage;

export const getServerSideProps: GetServerSideProps<ServiceDetailsProps> = async ({ params }) => {
  try {
    const serviceId = params?.serviceId; // Use optional chaining to handle undefined params or missing id property
    if (!serviceId) {
      return { notFound: true };
    }
    console.log("running")
    const response = await axios.get<ServiceDetailsResponse>(`http://127.0.0.1:8000/services/${serviceId}/`);
    console.log(response)
    const serviceDetails = response.data;
    console.log(serviceDetails)
    return {
      props: { serviceDetails },
    };
  } catch (error) {
    console.error('Error fetching service details:', error);
    return {
      notFound: true,
    };
  }
};