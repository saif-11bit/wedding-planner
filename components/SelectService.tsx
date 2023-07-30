import useAuth from "@/hooks/useAuth";
import Modal from "./Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import generatePDF from '@/utils/generatePDF';
import useServiceModal from "@/hooks/userServiceModal";

interface SubService {
    id: number;
    sub_service_name: string;
    starting_price: number;
    isChecked: boolean;
}

const SelectService = () => {
  const {isOpen, onClose} = useServiceModal();
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const onChange = (open: boolean) => {
    if (!open) {
        setSubServices([]);
        onClose();
    }
}
  // Fetch sub-services data from the API
  useEffect(() => {
    axios.get<SubService[]>('http://localhost:8000/subservices')
      .then((response) => {
        setSubServices(response.data.map((subService) => ({ ...subService, isChecked: false })));
      })
      .catch((error) => {
        console.error('Error fetching sub-services:', error);
      });
  }, []);

  // Handle checkbox toggle
  const handleCheckboxToggle = (id: number) => {
    setSubServices((prevSubServices) =>
      prevSubServices.map((subService) =>
        subService.id === id ? { ...subService, isChecked: !subService.isChecked } : subService
      )
    );
  };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get selected sub-services
    const selectedSubServices = subServices.filter((subService) => subService.isChecked);
    onClose()
    // Do something with the selected sub-services (e.g., send to the server)
    console.log(selectedSubServices);
    generatePDF(selectedSubServices)
  };

  return ( 
      <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Welcome Back"
      description="Select service"
    >
    <form onSubmit={handleSubmit}>
      {subServices.map((subService) => (
        <div key={subService.id}>
          <input
            style={{ width: '20px', height: '20px' }}
            type="checkbox"
            id={subService.id.toString()}
            checked={subService.isChecked}
            onChange={() => handleCheckboxToggle(subService.id)}
          />
          <label className="text-white pl-2 text-2xl" htmlFor={subService.id.toString()}>{subService.sub_service_name}</label>
        </div>
      ))}
      <button type="submit" className="text-white border bg-transparent mt-3 w-4/5 p-5 hover:bg-amber-500">Submit</button>
    </form>
    </Modal>
    );
}

export default SelectService;