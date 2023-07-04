// pages/[serviceId].tsx

import { useRouter } from 'next/router';

const ServiceDetailPage: React.FC = () => {
  const router = useRouter();
  const { serviceId } = router.query;

  // Fetch service details using the serviceId and display them on the page

  return <div className=' text-white'>Service Detail Page for {serviceId}</div>;
};

export default ServiceDetailPage;
